<?php

namespace Biz\Classroom\Accessor;

use Biz\Accessor\AccessorAdapter;

class JoinClassroomAccessor extends AccessorAdapter
{
    public function access($classroom)
    {
        if (empty($classroom)) {
            return $this->buildResult('classroom.not_found');
        }

        if ($classroom['status'] === 'draft') {
            return $this->buildResult('classroom.unpublished');
        }

        if ($classroom['status'] === 'closed') {
            return $this->buildResult('classroom.closed');
        }

        if ($this->isExpired($classroom)) {
            return $this->buildResult('classroom.expired');
        }

        return true;
    }

    public function isExpired($classroom)
    {
        $expiryMode = $classroom['expiryMode'];

        if ($expiryMode === 'date') {
            return time() > $classroom['expiryValue'];
        }

        return false;
    }
}
