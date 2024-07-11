import {pool} from '../config/db';
import { Priority } from '../models/priorityModel';

export default class priorityRepo {
    static async getAllPriority(): Promise<Priority[]> {
        try {
            console.log('Entering getAllPriority method');
            const result = await pool.query('SELECT name FROM priority');
            console.log('Query executed successfully, result:', result.rows);

            
            return result.rows as Priority[];
        } catch (err) {
            console.error('Error executing query in getAllPriority:', err);
            throw err;
        }
    }
}

            
  