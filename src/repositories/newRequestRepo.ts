import { pool } from '../config/db';
import { Request } from '../models/requestModel';

export const AddDetails = async (
  title: string,
  requestGroupId: number,
  description: string,
  JiraLink: string,
  priorityId: number,
  productManagerId: number
): Promise<Request> => {
  const result = await pool.query(
    `INSERT INTO request (title, requestGroupid, description, JiraLink, priority_id, productmanagerid, datetime) 
     VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
     RETURNING id, title, requestGroupid AS requestGroupId, description, JiraLink, datetime AS date, priority_id AS priorityId, productmanagerid AS productManagerId`,
    [title, requestGroupId, description, JiraLink, priorityId, productManagerId]
  );
  return result.rows[0] as Request;
};
