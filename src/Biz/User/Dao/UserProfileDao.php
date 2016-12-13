<?php

namespace Biz\User\Dao;

interface UserProfileDao
{
    public function getProfile($id);

    public function addProfile($profile);

    public function updateProfile($id, $profile);

    public function findProfilesByIds(array $ids);

    public function dropFieldData($fieldName);

    public function searchProfiles($conditions, $orderBy, $start, $limit);

    public function searchProfileCount($conditions);

    public function findDistinctMobileProfiles($start, $limit);
}
