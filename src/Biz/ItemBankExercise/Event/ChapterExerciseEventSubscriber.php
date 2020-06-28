<?php

namespace Biz\ItemBankExercise\Event;

use AppBundle\Common\ArrayToolkit;
use Codeages\Biz\Framework\Event\Event;
use Codeages\Biz\ItemBank\Answer\Service\AnswerQuestionReportService;
use Codeages\Biz\ItemBank\Answer\Service\AnswerService;
use Codeages\PluginBundle\Event\EventSubscriber;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ChapterExerciseEventSubscriber extends EventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'answer.submitted' => 'onAnswerSubmitted',
            'answer.saved' => 'onAnswerSaved',
            'answer.finished' => 'onAnswerFinished',
        ];
    }

    public function onAnswerSubmitted(Event $event)
    {
        $answerRecord = $event->getSubject();
        $chapterExerciseRecord = $this->getItemBankChapterExerciseRecordService()->getByAnswerRecordId($answerRecord['id']);
        if (empty($chapterExerciseRecord)) {
            return;
        }

        if (AnswerService::ANSWER_RECORD_STATUS_FINISHED == $answerRecord['status']) {
            $this->finished($chapterExerciseRecord, $answerRecord['answer_report_id']);
        } else {
            $this->getItemBankChapterExerciseRecordService()->update(
                $chapterExerciseRecord['id'],
                [
                    'doneQuestionNum' => $this->getDoneQuestionNumByAnswerReport(
                        $this->getAnswerReportService()->get($answerRecord['answer_report_id'])
                    ),
                    'status' => $answerRecord['status'],
                ]
            );
        }
    }

    public function onAnswerSaved(Event $event)
    {
        $assessmentResponse = $event->getSubject();
        $chapterExerciseRecord = $this->getItemBankChapterExerciseRecordService()->getByAnswerRecordId($assessmentResponse['answer_record_id']);
        if (empty($chapterExerciseRecord)) {
            return;
        }

        $this->getItemBankChapterExerciseRecordService()->update(
            $chapterExerciseRecord['id'],
            ['doneQuestionNum' => $this->getDoneQuestionNumByAssessmentResponse($assessmentResponse)]
        );
    }

    public function onAnswerFinished(Event $event)
    {
        $answerReport = $event->getSubject();
        $chapterExerciseRecord = $this->getItemBankChapterExerciseRecordService()->getByAnswerRecordId($answerReport['answer_record_id']);
        if (empty($chapterExerciseRecord)) {
            return;
        }

        $this->finished($chapterExerciseRecord, $answerReport['id']);
    }

    protected function finished($chapterExerciseRecord, $answerReportId)
    {
        $answerReport = $this->getAnswerReportService()->get($answerReportId);

        $this->getItemBankChapterExerciseRecordService()->update(
            $chapterExerciseRecord['id'],
            [
                'doneQuestionNum' => $this->getDoneQuestionNumByAnswerReport($answerReport),
                'rightQuestionNum' => $answerReport['right_question_count'],
                'rightRate' => $answerReport['right_rate'],
                'status' => AnswerService::ANSWER_RECORD_STATUS_FINISHED,
            ]
        );

        $this->updateQuestionRecord($chapterExerciseRecord, $answerReport);

        $this->updateMember($chapterExerciseRecord);
    }

    protected function updateMember($chapterExerciseRecord)
    {
        $itemBankExercise = $this->getItemBankExerciseService()->get($chapterExerciseRecord['exerciseId']);
        $questinBank = $this->getQuestionBankService()->getQuestionBank($itemBankExercise['questionBankId']);
        $member = $this->getItemBankExerciseMemberService()->getByEerciseIdAndUserId($chapterExerciseRecord['exerciseId'], $chapterExerciseRecord['userId']);

        $doneQuestionNum = $rightQuestionNum = $completionRate = $masteryRate = 0;
        $questionRecords = $this->getItemBankExerciseQuestionRecordService()->findByUserIdAndModuleId(
            $chapterExerciseRecord['userId'],
            $chapterExerciseRecord['moduleId']
        );

        foreach ($questionRecords as $questionRecord) {
            if (AnswerQuestionReportService::STATUS_RIGHT == $questionRecord['status']) {
                ++$rightQuestionNum;
            }
        }
        $doneQuestionNum = count($questionRecords);
        $masteryRate = 0 == $questinBank['itemBank']['question_num'] ? 0 : $rightQuestionNum / $questinBank['itemBank']['question_num'] * 100;
        $completionRate = 0 == $questinBank['itemBank']['question_num'] ? 0 : $doneQuestionNum / $questinBank['itemBank']['question_num'] * 100;

        $this->getItemBankExerciseMemberService()->update($member['id'], [
            'doneQuestionNum' => $doneQuestionNum,
            'rightQuestionNum' => $rightQuestionNum,
            'completionRate' => $completionRate,
            'masteryRate' => $masteryRate,
        ]);
    }

    protected function updateQuestionRecord($chapterExerciseRecord, $answerReport)
    {
        $questionRecords = ArrayToolkit::index(
            $this->getItemBankExerciseQuestionRecordService()->findByUserIdAndModuleId(
                $chapterExerciseRecord['userId'],
                $chapterExerciseRecord['moduleId']
            ),
            'questionId'
        );
        $answerQuestionReports = $this->getAnswerQuestionReports($answerReport);

        $updateRecords = [];
        $createRecords = [];
        foreach ($answerQuestionReports as $answerQuestionReport) {
            if (empty($questionRecords[$answerQuestionReport['questionId']])) {
                $createRecords[] = [
                    'exerciseId' => $chapterExerciseRecord['exerciseId'],
                    'userId' => $chapterExerciseRecord['userId'],
                    'moduleId' => $chapterExerciseRecord['moduleId'],
                    'itemId' => $answerQuestionReport['itemId'],
                    'questionId' => $answerQuestionReport['questionId'],
                    'status' => $answerQuestionReport['status'],
                ];
            } elseif ($questionRecords[$answerQuestionReport['questionId']]['status'] != $answerQuestionReport['status']) {
                $updateRecords[] = [
                    'id' => $questionRecords[$answerQuestionReport['questionId']]['id'],
                    'status' => $answerQuestionReport['status'],
                ];
            }
        }

        !empty($updateRecords) && $this->getItemBankExerciseQuestionRecordService()->batchUpdate(ArrayToolkit::column($updateRecords, 'id'), $updateRecords);
        !empty($createRecords) && $this->getItemBankExerciseQuestionRecordService()->batchCreate($createRecords);
    }

    protected function getAnswerQuestionReports($answerReport)
    {
        $answerQuestionReports = [];

        foreach ($answerReport['section_reports'] as $sectionReport) {
            foreach ($sectionReport['item_reports'] as $itemReport) {
                foreach ($itemReport['question_reports'] as $questionReport) {
                    $status = AnswerQuestionReportService::STATUS_RIGHT == $questionReport['status'] ? AnswerQuestionReportService::STATUS_RIGHT : AnswerQuestionReportService::STATUS_WRONG;
                    $answerQuestionReports[] = [
                        'itemId' => $itemReport['item_id'],
                        'questionId' => $questionReport['question_id'],
                        'status' => $status,
                    ];
                }
            }
        }

        return $answerQuestionReports;
    }

    protected function getDoneQuestionNumByAssessmentResponse($assessmentResponse)
    {
        $doneQuestionNum = 0;

        foreach ($assessmentResponse['section_responses'] as $sectionResponse) {
            foreach ($sectionResponse['item_responses'] as $itemResponse) {
                foreach ($itemResponse['question_responses'] as $questionResponse) {
                    if (array_filter($questionResponse['response'])) {
                        ++$doneQuestionNum;
                    }
                }
            }
        }

        return $doneQuestionNum;
    }

    protected function getDoneQuestionNumByAnswerReport($answerReport)
    {
        $doneQuestionNum = 0;

        foreach ($answerReport['section_reports'] as $sectionReport) {
            foreach ($sectionReport['item_reports'] as $itemReport) {
                foreach ($itemReport['question_reports'] as $questionReport) {
                    if (array_filter($questionReport['response'])) {
                        ++$doneQuestionNum;
                    }
                }
            }
        }

        return $doneQuestionNum;
    }

    /**
     * @return \Codeages\Biz\ItemBank\Answer\Service\AnswerRecordService
     */
    protected function getAnswerRecordService()
    {
        return $this->getBiz()->service('ItemBank:Answer:AnswerRecordService');
    }

    /**
     * @return \Biz\ItemBankExercise\Service\ChapterExerciseRecordService
     */
    protected function getItemBankChapterExerciseRecordService()
    {
        return $this->getBiz()->service('ItemBankExercise:ChapterExerciseRecordService');
    }

    /**
     * @return \Codeages\Biz\ItemBank\Answer\Service\AnswerReportService
     */
    protected function getAnswerReportService()
    {
        return $this->getBiz()->service('ItemBank:Answer:AnswerReportService');
    }

    /**
     * @return AnswerQuestionReportService
     */
    protected function getAnswerQuestionReportService()
    {
        return $this->getBiz()->service('ItemBank:Answer:AnswerQuestionReportService');
    }

    /**
     * @return \Biz\ItemBankExercise\Service\ExerciseQuestionRecordService
     */
    protected function getItemBankExerciseQuestionRecordService()
    {
        return $this->getBiz()->service('ItemBankExercise:ExerciseQuestionRecordService');
    }

    /**
     * @return \Biz\ItemBankExercise\Service\ExerciseMemberService
     */
    protected function getItemBankExerciseMemberService()
    {
        return $this->getBiz()->service('ItemBankExercise:ExerciseMemberService');
    }

    /**
     * @return \Biz\ItemBankExercise\Service\ExerciseService
     */
    protected function getItemBankExerciseService()
    {
        return $this->getBiz()->service('ItemBankExercise:ExerciseService');
    }

    /**
     * @return \Biz\QuestionBank\Service\QuestionBankService
     */
    protected function getQuestionBankService()
    {
        return $this->getBiz()->service('QuestionBank:QuestionBankService');
    }
}
