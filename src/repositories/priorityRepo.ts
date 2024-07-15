
import {pool} from '../config/db';
import {Priority} from '../models/priorityModel'
export default class PriorityRepo {
    static async getAllPriority(): Promise<Priority[]> {
        try {
          const result = await pool.query('SELECT critical FROM priority');
          console.log(result.rows)
          return result.rows as Priority[];
        } catch (err) {
            console.error('Error executing query in getAllPriority:', err);
            throw err;
        }
    }
}
            
  