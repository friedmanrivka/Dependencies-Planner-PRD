import { pool } from '../config/db';
import { Request } from '../models/requestModel';

export const AddDetails = async (
  title: string,
  requestGroupId: number,
  description: string,
  JiraLink: string,
  priorityId: number,
  productManagerId: number,
  affectedGroupList: number[],
  planned: string
): Promise<Request> => {
  const result = await pool.query(
    `INSERT INTO request (title, requestgroupid, description, JiraLink, priority_id, productmanagerid, datetime, affectedgroupslist, planned) 
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8) 
     RETURNING id, title, requestgroupid AS requestGroupId, description, JiraLink, datetime AS date, priority_id AS priorityId, productmanagerid AS productManagerId, affectedgroupslist AS affectedGroupList, planned`,
    [title, requestGroupId, description, JiraLink, priorityId, productManagerId, affectedGroupList, planned]
  );
  
  const newRequest = result.rows[0] as Request;

  const statusResult = await pool.query('SELECT status FROM status WHERE id = $1', [2]);
  if (statusResult.rowCount === 0) {
    throw new Error('Invalid status id');
  }
  const statusName = statusResult.rows[0].status;

  for (const groupId of affectedGroupList) {
    await pool.query(
      `INSERT INTO affectedgroups (requestid, groupid, status_id) VALUES ($1, $2, $3)`,
      [newRequest.id, groupId, 2]
    );
  }

  for (const groupId of affectedGroupList) {
    await pool.query(
      `INSERT INTO request_affected_groups (request_id, group_id, status) VALUES ($1, $2, $3)`,
      [newRequest.id, groupId, statusName]
    );
  }

  return newRequest;
};
