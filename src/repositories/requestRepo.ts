

// import { pool } from '../config/db';
// import GroupRepo from './groupRepo';
// import { ExtendedRequest } from '../models/extendedRequestModel';

// export default class RequestRepo {
//     static async getAllRequest(): Promise<ExtendedRequest[]> {
//         try {
//             console.log('Entering getAllRequests method');

//             const result = await pool.query(`
//                 SELECT
//                     r.requestgroupid,
//                     pr.productmanagername,
//                     r.title,
//                     r.comment, 
//                     r.description, 
//                     r.planned,
//                     r.jiralink,
//                     p.critical, 
//                     f.decision,
//                     json_agg(
//                         json_build_object(
//                             'groupid', ag.groupid,
//                             'statusname', s.status
//                         )
//                     ) as affectedGroupsList
//                 FROM request r
//                 LEFT JOIN finaldecision f ON f.id = r.finaldecision 
//                 LEFT JOIN priority p ON r.priority_id = p.id 
//                 JOIN productmanager pr ON r.productmanagerid = pr.email
//                 LEFT JOIN affectedgroups ag ON ag.requestid = r.id
//                 LEFT JOIN status s ON s.id = ag.status_id
//                 GROUP BY
//                     r.id,
//                     pr.productmanagername,
//                     r.title,
//                     r.comment, 
//                     r.description, 
//                     r.planned,
//                     r.jiralink,
//                     p.critical, 
//                     f.decision;
//             `);

//             console.log('Request Query executed successfully, result:', JSON.stringify(result.rows, null, 2));

//             const requests = result.rows;

//             const groups = await GroupRepo.getAllGroup();

//             console.log('Groups fetched successfully:', JSON.stringify(groups, null, 2));

//             const transformedRequests = requests.map(request => {
//                 console.log('Processing request:', JSON.stringify(request, null, 2));

//                 const group = groups.find((g: any) => g.id === request.requestgroupid);
//                 const requestorGroup = group ? group.name : 'Unknown Group';

//                 const affectedGroupsList = (request.affectedgroupslist || []).map((ag: any) => {
//                     const affectedGroup = groups.find((g: any) => g.id === ag.groupid);
//                     return {
//                         groupname: affectedGroup ? affectedGroup.name : 'Unknown Group',
//                         statusname: ag.statusname
//                     };
//                 });

//                 return {
//                     ...request,
//                     requestorGroup,
//                     affectedGroupsList
//                 };
//             }).map(({ requestgroupid, affectedgroupslist, ...rest }) => ({
//                 ...rest,
//                 requestorGroup: rest.requestorGroup,
//                 affectedGroupsList: rest.affectedGroupsList
//             }));

//             console.log('Transformed requests:', JSON.stringify(transformedRequests, null, 2));

//             return transformedRequests;
//         } catch (err) {
//             console.error('Error executing query in getAllRequests:', err);
//             throw err;
//         }
//     }

//     static async updateFinalDecision(requestId: number, finalDecision: string): Promise<void> {
//         try {
//             await pool.query(
//                 `UPDATE request r
//                 SET finalDecision = (SELECT id FROM finaldecision WHERE decision = $1)
//                 WHERE r.id = $2`, 
//                 [finalDecision, requestId]);
//         } catch (err) {
//             console.error('Error updating final decision:', err);
//             throw err;
//         }
//     }
// }

import { pool } from '../config/db';
import GroupRepo from './groupRepo';
import { ExtendedRequest } from '../models/extendedRequestModel';

export default class RequestRepo {
    static async getAllRequest(): Promise<ExtendedRequest[]> {
        try {
            console.log('Entering getAllRequests method');

            const result = await pool.query(`
                SELECT
                    r.requestgroupid,
                    pr.productmanagername,
                    r.title,
                    r.comment, 
                    r.description, 
                    r.planned,
                    r.jiralink,
                    p.critical, 
                    f.decision,
                    json_agg(
                        json_build_object(
                            'groupid', ag.groupid,
                            'statusname', s.status
                        )
                    ) as affectedGroupsList
                FROM request r
                LEFT JOIN finaldecision f ON f.id = r.finaldecision 
                LEFT JOIN priority p ON r.priority_id = p.id 
                JOIN productmanager pr ON r.productmanagerid = pr.email
                LEFT JOIN affectedgroups ag ON ag.requestid = r.id
                LEFT JOIN status s ON s.id = ag.status_id
                GROUP BY
                    r.id,
                    pr.productmanagername,
                    r.title,
                    r.comment, 
                    r.description, 
                    r.planned,
                    r.jiralink,
                    p.critical, 
                    f.decision;
            `);

            console.log('Request Query executed successfully, result:', JSON.stringify(result.rows, null, 2));

            const requests = result.rows;
            const groups = await GroupRepo.getAllGroup();

            console.log('Groups fetched successfully:', JSON.stringify(groups, null, 2));

            const transformedRequests = requests.map(request => {
                console.log('Processing request:', JSON.stringify(request, null, 2));

                const group = groups.find((g: any) => g.id === request.requestgroupid);
                const requestorGroup = group ? group.name : 'Unknown Group';

                // Create a map for quick lookup of affected groups
                const affectedGroupsMap = new Map(request.affectedgroupslist.map((ag: any) => [ag.groupid, ag.statusname]));

                // Create the full affected groups list
                const affectedGroupsList = groups.map((g: any) => ({
                    groupname: g.name,
                    statusname: affectedGroupsMap.get(g.id) || 'Not Required'
                }));

                return {
                    ...request,
                    requestorGroup,
                    affectedGroupsList
                };
            }).map(({ requestgroupid, affectedgroupslist, ...rest }) => ({
                ...rest,
                requestorGroup: rest.requestorGroup,
                affectedGroupsList: rest.affectedGroupsList
            }));

            console.log('Transformed requests:', JSON.stringify(transformedRequests, null, 2));

            return transformedRequests;
        } catch (err) {
            console.error('Error executing query in getAllRequests:', err);
            throw err;
        }
    }

    static async updateFinalDecision(requestId: number, finalDecision: string): Promise<void> {
        try {
            await pool.query(
                `UPDATE request r
                SET finalDecision = (SELECT id FROM finaldecision WHERE decision = $1)
                WHERE r.id = $2`, 
                [finalDecision, requestId]);
        } catch (err) {
            console.error('Error updating final decision:', err);
            throw err;
        }
    }
}

