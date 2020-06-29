<?php

namespace Biz\ItemBankExercise;

use AppBundle\Common\Exception\AbstractException;

class ItemBankExerciseException extends AbstractException
{
    const EXCEPTION_MODULE = 73;

    const FORBIDDEN_LEARN = 4037301;

    const CANNOT_START_CHAPTER_ANSWER = 4037302;

    const NOTFOUND_EXERCISE = 4047303;

    const FORBIDDEN_MANAGE_EXERCISE = 4037304;

    const UNPUBLISHED_EXERCISE = 4037305;

    const EXPIRYDAYS_REQUIRED = 5007306;

    const EXPIRYDAYS_INVALID = 5007307;

    const EXPIRYENDDATE_REQUIRED = 5007308;

    const EXPIRYSTARTDATE_REQUIRED = 5007309;

    const EXPIRY_DATE_SET_INVALID = 5007310;

    const EXPIRYMODE_INVALID = 5007311;

    public $messages = [
        4037301 => 'exception.item_bank_exercise.forbidden_learn',
        4037302 => 'exception.item_bank_exercise.cannot_start_chapter_answer',
        4047303 => 'exception.item_bank_exercise.exercise.not_found',
        4037304 => 'exception.item_bank_exercise.exercise.forbidden_manage_exercise',
        4037305 => 'exception.item_bank_exercise.exercise.exercise_not_published',
        5007306 => 'exception.item_bank_exercise.expirydays_required',
        5007307 => 'exception.item_bank_exercise.expirydays_invalid',
        5007308 => 'exception.item_bank_exercise.expiryenddate_required',
        5007309 => 'exception.item_bank_exercise.expirystartdate_required',
        5007310 => 'exception.item_bank_exercise.expirydate_end_later_than_start',
        5007311 => 'exception.item_bank_exercise.expirymode_invalid',
    ];
}
