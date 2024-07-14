import {pool} from '../config/db';
import {Request} from '../models/requestModel';
import  {ExtendedRequest}from '../models/extendedRequestModel'
import { mapRequestsToGroups } from '../utility/dataMapper';
import GroupRepo from '../repositories/groupRepo';
export default class RequestRepo {
static async getAllRequst(): Promise<ExtendedRequest[]> {
    try {
        console.log('Entering getAllRequests method');
        const result = await pool.query(`
            SELECT r.requestgroupid, pr.productmanagername, r.title, r.comment, r.description, r.planned, r.jiralink, p.critical, f.decision 
            FROM finaldecision f
            JOIN request r ON f.id = r.finaldecision 
            JOIN priority p ON r.priority_id = p.id 
            JOIN productmanager pr ON r.productmanagerid = pr.email
            
        `);
        console.log(' Request Query executed successfully, result:', result.rows);

        const requests = result.rows as Request[];
        const groups = await GroupRepo.getAllGroup();
console .log('Groups fetched successfully:', groups)
        const requestsWithGroup = mapRequestsToGroups(requests, groups) as ExtendedRequest[];
console.log('mapped requests with groups:',requestsWithGroup)
        return requestsWithGroup;
    } 
        catch (err) {
        console.error('Error executing query in getAllRequests:', err);
        throw err;
    }
}
}

