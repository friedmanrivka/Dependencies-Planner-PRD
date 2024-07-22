import { pool } from '../config/db';
import { Request } from '../models/requestModel';

export const AddDetails = async (
  title: string,
  requestGroupId: number,
  description: string,
  JiraLink: string,
  priorityId: number,
  productManagerId: number,
  affectedGroupList: number[]
): Promise<Request> => {
  const result = await pool.query(
    `INSERT INTO request (title, requestgroupid, description, JiraLink, priority_id, productmanagerid, datetime, affectedgroupslist) 
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7) 
     RETURNING id, title, requestgroupid AS requestGroupId, description, JiraLink, datetime AS date, priority_id AS priorityId, productmanagerid AS productManagerId, affectedgroupslist AS affectedGroupList`,
    [title, requestGroupId, description, JiraLink, priorityId, productManagerId, affectedGroupList]
  );
  
  const newRequest = result.rows[0] as Request;

  // Fetch the status name for id 4
  const statusResult = await pool.query('SELECT status FROM status WHERE id = $1', [4]);
  if (statusResult.rowCount === 0) {
    throw new Error('Invalid status id');
  }
  const statusName = statusResult.rows[0].status;

  // Insert into the affectedgroups table
  for (const groupId of affectedGroupList) {
    await pool.query(
      `INSERT INTO affectedgroups (requestid, groupid, status_id) VALUES ($1, $2, $3)`,
      [newRequest.id, groupId, 4]
    );
  }

  // Insert into the request_affected_groups table
  for (const groupId of affectedGroupList) {
    await pool.query(
      `INSERT INTO request_affected_groups (request_id, group_id, status) VALUES ($1, $2, $3)`,
      [newRequest.id, groupId, statusName]
    );
  }

  return newRequest;
};
