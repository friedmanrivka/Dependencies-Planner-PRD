import {pool} from '../config/db';
import {Status} from '../models/statusModel'
export default class StatusRepo {
    static async getAllStatus(): Promise<Status[]> {
        try {
          const result = await pool.query('SELECT status FROM status');
          console.log(result.rows)
            return result.rows as Status[];
        } catch (err) {
            console.error('Error executing query in getAllStatus:', err);
            throw err;
        }
    }
}

