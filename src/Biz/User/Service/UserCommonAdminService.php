<?php

namespace Biz\User;

interface UserCommonAdminService
{
    public function getCommonAdmin($id);

    public function findCommonAdminByUserId($userId);

    public function getCommonAdminByUserIdAndUrl($userId, $url);

    public function addCommonAdmin($admin);

    public function deleteCommonAdmin($id);
}
