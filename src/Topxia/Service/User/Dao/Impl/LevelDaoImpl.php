<?php

namespace Topxia\Service\User\Dao\Impl;

use Topxia\Service\Common\BaseDao;
use Topxia\Service\User\Dao\LevelDao;
use Topxia\Common\DaoException;
use PDO;

class LevelDaoImpl extends BaseDao implements LevelDao
{
	protected $table = 'member_level';

    public function getLevel($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? LIMIT 1";
        return $this->getConnection()->fetchAssoc($sql, array($id)) ? : null;
    }

    public function getLevelByName($name)
    {
        $sql = "SELECT * FROM {$this->table} WHERE name = ? LIMIT 1";
        return $this->getConnection()->fetchAssoc($sql, array($name)) ? : null;
    }

	public function searchLevels($conditions, $start, $limit)
    {
        $this->filterStartLimit($start, $limit);
        $builder = $this->createLevelSearchQueryBuilder($conditions)
        ->select('*')
        ->setFirstResult($start)
        ->setMaxResults($limit)
        ->orderBy('seq','ASC');
        return $builder->execute()->fetchAll() ? : array(); 
    }

    public function searchLevelsCount($conditions)
    {
        $builder = $this->createLevelSearchQueryBuilder($conditions)
            ->select('COUNT(id)');
        return $builder->execute()->fetchColumn(0);
    }

    public function createLevel($level)
    {
        $affected = $this->getConnection()->insert($this->table, $level);
        if ($affected <= 0) {
            throw $this->createDaoException('Insert level post error.');
        }
        return $this->getLevel($this->getConnection()->lastInsertId());
    }

    public function updateLevel($id,$fields)
     {
        $this->getConnection()->update($this->table, $fields, array('id' => $id));
        return $this->getLevel($id);
    }

    public function deleteLevel($id)
    {
        return $this->getConnection()->delete($this->table, array('id' => $id));
    }

    private function createLevelSearchQueryBuilder($conditions)
    {
        
        $builder = $this->createDynamicQueryBuilder($conditions)
        ->from($this->table, 'member_level')
        ->andWhere('id = :id')
        ->andWhere('name LIKE :name')
        ->andWhere('icon = :icon')
        ->andWhere('seq < :seq');

        return $builder;
    }

}

