import { pool ,pool2} from '../config/db';
import GroupRepo from './groupRepo';
import { ExtendedRequest } from '../models/extendedRequestModel';

export default class RequestRepo {
    static async getAllRequest(): Promise<ExtendedRequest[]> {
        try {
            console.log('Entering getAllRequests method');

            const result = await pool.query(`
                SELECT
                  
                r.id,  
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
                const affectedGroupsMap = new Map(request.affectedgroupslist.map((ag: any) => [ag.groupid, ag.statusname]));
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
    // static async updateFinalDecision(requestId: number, finalDecision: string,jiraLinkOrComment:string): Promise<void> {
    //     try {
    //         console.log(requestId);
    //         console.log(finalDecision);
    //         console.log(jiraLinkOrComment);
    //         if(finalDecision.toLowerCase()==='inq'){
    //             console.log('jk')
    //             await pool.query(
    //                 `UPDATE request SET finaldecision = (SELECT id FROM finaldecision WHERE decision = $2),jiralink= $3 WHERE id = $1`, 
    //                 [finalDecision, requestId,jiraLinkOrComment]
               
    //             );
                
    //           }
    //         else if(finalDecision .toLowerCase()==='notinq')
             
    //         {
    //             console.log('update jira');
    //             await pool.query(
    //             `UPDATE request SET finaldecision = (SELECT id FROM finaldecision WHERE decision = $2) ,comment = $3 WHERE id = $1`, 
    //             [finalDecision, requestId,jiraLinkOrComment]
    //             )
    //             console.log('update comment');
    //         }
    //     } catch (err) {
    //         console.error('Error updating final decision:', err);
    //         throw err;
    //     }
    // }
   
        static async updateFinalDecision(requestId: number, finalDecision: string, jiraLinkOrComment: string): Promise<void> {
            try {
                if (finalDecision.toLowerCase() === 'inq') {
                    await pool.query(
                        `UPDATE request SET finaldecision = (SELECT id FROM finaldecision WHERE decision = $2), jiralink = $3 WHERE id = $1`, 
                        [requestId, finalDecision, jiraLinkOrComment]
                    );
                    console.log('update jira');
                } else if (finalDecision.toLowerCase() === 'notinq') {
                    await pool.query(
                        `UPDATE request SET finaldecision = (SELECT id FROM finaldecision WHERE decision = $2), comment = $3 WHERE id = $1`, 
                        [requestId, finalDecision, jiraLinkOrComment]
                    );
                    console.log('update comment');
                } else {
                    throw new Error('Invalid final decision');
                }
            } catch (err) {
                console.error('Error updating final decision:', err);
                throw err;
            }
        }
 static async updateDescription(requestId: number, description: string): Promise<void> {
        try {
            await pool.query(
                `UPDATE request SET description = $1 WHERE id = $2`, 
                [description, requestId]
            );
        } catch (err) {
            console.error('Error updating description:', err);
            throw err;
        }
    }
    static async updateRequestTitle(requestId: number, title: string): Promise<void> {
        try {
            await pool.query(
                `UPDATE request SET title = $1 WHERE id = $2`, 
                [title, requestId]
            );
           } catch (err) {
            console.error('Repository: Error updating title:', err);
            throw err;
        }
    }
    static async updateRequestComment(requestId: number, comment: string): Promise<void> {
        try {
            console.log('update comment')
            await pool.query(
                `UPDATE request SET comment = $1 WHERE id = $2`, 
                [comment, requestId]
            );
            console.log('Repository: Comment updated successfully');
        } catch (err) {
            console.error('Repository: Error updating comment:', err);
            throw err;
        }
    }
    static async updateRequestJira(requestId: number, jira: string): Promise<void> {
        try {
            console.log('update jira')
            await pool.query(
                `UPDATE request SET jiralink = $1 WHERE id = $2`, 
                [jira, requestId]
            );
            console.log('Repository: jira updated successfully');
        } catch (err) {
            console.error('Repository: Error updating jira:', err);
            throw err;
        }
    }
    static async updateRequestProductManager(requestId: number, productManagerName: string): Promise<void> {
        try {
            const productManagerResult = await pool.query(
                `SELECT email FROM productmanager WHERE productmanagername = $1`, 
                [productManagerName]
               
            );
           
            console.log(productManagerResult);
         if (productManagerResult.rows.length === 0) {
                throw new Error('Product Manager not found');
            }
            const productManagerEmail = productManagerResult.rows[0].email;

            await pool.query(
                `UPDATE request SET productmanagerid = $1 WHERE id = $2`, 
                [productManagerEmail, requestId]
            );
            console.log('Repository: Product Manager updated successfully');
        } catch (err) {
            console.error('Repository: Error updating Product Manager:', err);
            throw err;
        }
    }
    static async updateRequestorGroup(requestId: number, groupName: string): Promise<void> {
        try {
            const groupResult = await pool2.query(
                `SELECT id FROM "group" WHERE name = $1`, 
                [groupName]
               
            );
           
      
         if (groupResult.rows.length === 0) {
                throw new Error('groupnnot found');
            }
            const groupId = groupResult.rows[0].id;

            await pool.query(
                `UPDATE request SET requestgroupid = $1 WHERE id = $2`, 
                [groupId, requestId]
            );
            console.log('Repository:requestor group updated successfully');
        } catch (err) {
            console.error('Repository: Error updating requestor group:', err);
            throw err;
        }
    }

    static async updatePriority(requestId: number, priorityName: string): Promise<void> {
        try {
            const priorityResult = await pool.query(
                `SELECT id FROM priority WHERE critical = $1`, 
                [priorityName]
               
            );
           
         if (priorityResult.rows.length === 0) {
                throw new Error('prioruty not found');
            }
            const priorityId = priorityResult.rows[0].id;
            await pool.query(
                `UPDATE request SET priority_id = $1 WHERE id = $2`, 
                [priorityId, requestId]
            );
            console.log('Repository:priority updated successfully');
        } catch (err) {
            console.error('Repository: Error updating priority:', err);
            throw err;
        }
    }
   
    


    static async updateAffectedGroup(requestId: number, groupName: string, statusName: string): Promise<void> {
        try {
          // Begin a transaction
          await pool.query('BEGIN');
      
          // Get the group ID from the group name
          const groupResult = await pool2.query(
            `SELECT id FROM "group" WHERE name = $1`,
            [groupName]
          );
      
          if (groupResult.rows.length === 0) {
            throw new Error(`Group ${groupName} not found`);
          }
      
          const groupId = groupResult.rows[0].id;
      
          // Get the status ID from the status name
          const statusResult = await pool.query(
            `SELECT id FROM status WHERE status = $1`,
            [statusName]
          );
      
          if (statusResult.rows.length === 0) {
            throw new Error(`Status ${statusName} not found`);
          }
      
          const statusId = statusResult.rows[0].id;
      
          // Update the affected group status
          await pool.query(
            `UPDATE affectedgroups SET status_id = $1 WHERE requestid = $2 AND groupid = $3`,
            [statusId, requestId, groupId]
          );
      
          // Commit the transaction
          await pool.query('COMMIT');
        } catch (err) {
          // Rollback the transaction in case of an error
          await pool.query('ROLLBACK');
          console.error('Error updating affected group:', err);
          throw err;
        }
      }
      



//     static async updateAffectedGroup(requestId: number, groupName: string, statusName: string): Promise<void> {
//         try {
//           // Begin a transaction
//           await pool.query('BEGIN');
    
//           // Get the group ID from the group name
//           const groupResult = await pool2.query(
//             `SELECT id FROM "group" WHERE name = $1`,
//             [groupName]
//           );
    
//           if (groupResult.rows.length === 0) {
//             throw new Error(`Group ${groupName} not found`);
//           }
    
//           const groupId = groupResult.rows[0].id;
    
//           // Get the status ID from the status name
//           const statusResult = await pool.query(
//             `SELECT id FROM status WHERE critical = $1`,
//             [statusName]
//           );
    
//           if (statusResult.rows.length === 0) {
//             throw new Error(`Status ${statusName} not found`);
//           }
    
//           const statusId = statusResult.rows[0].id;
    
//           // Update the affected group status
//           await pool.query(
//             `UPDATE affectedgroups SET status_id = $1 WHERE requestid = $2 AND groupid = $3`,
//             [statusId, requestId, groupId]
//           );
    
//           // Commit the transaction
//           await pool.query('COMMIT');
//         } catch (err) {
//           // Rollback the transaction in case of an error
//           await pool.query('ROLLBACK');
//           console.error('Error updating affected group:', err);
//           throw err;
//         }
//       }




















}

