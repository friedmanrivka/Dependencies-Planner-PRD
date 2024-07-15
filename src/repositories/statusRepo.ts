// import {pool} from '../config/db';
// import {Status} from '../models/statusModel'
// export default class StatusRepo {
//     static async getAllStatus(): Promise<Status[]> {
//         try {
//           const result = await pool.query('SELECT status FROM status');
//           console.log(result.rows)
//             return result.rows as Status[];
//         } catch (err) {
//             console.error('Error executing query in getAllStatus:', err);
//             throw err;
//         }
//     }
// }

import { pool } from '../config/db';
import { Status } from '../models/statusModel';
import { TSize } from '../models/tSizeModel';

export interface CombinedStatus {
    combinedStatus: string;
}

export default class StatusRepo {
    static async getAllStatus(): Promise<CombinedStatus[]> {
        try {
            // Fetch statuses
            const statusResult = await pool.query<{ status_name: string }>(`
                SELECT status AS status_name 
                FROM status;
            `);
            console.log('Status Query executed successfully, result:', statusResult.rows);

            // Fetch t-shirt sizes
            const tsizeResult = await pool.query<{ size: string }>(`
                SELECT size 
                FROM t_size;
            `);
            console.log('T-Shirt Size Query executed successfully, result:', tsizeResult.rows);

            // Correctly map the results
            const statuses = statusResult.rows.map(row => row.status_name);
            const tsizes = tsizeResult.rows.map(row => row.size);

            const combinedStatuses: CombinedStatus[] = [];

            statuses.forEach(status => {
                if (status === 'In Q' || status === 'Not in Q') {
                    tsizes.forEach(tsize => {
                        combinedStatuses.push({
                            combinedStatus: `${status} (${tsize})`
                        });
                    });
                } else {
                    combinedStatuses.push({
                        combinedStatus: status
                    });
                }
            });

            return combinedStatuses;
        } catch (err) {
            console.error('Error executing query in getAllStatus:', err);
            throw err;
        }
    }
}

 