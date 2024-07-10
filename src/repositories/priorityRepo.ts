import {pool} from '../config/db';

export default class priorityRepo {
    static async getAllPriority(): Promise<{ name: string }[]> {
        try {
            console.log('Entering getAllPriority method');
            const result = await pool.query('SELECT name FROM priority');
            console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllPriority:', err);
            throw err;
        }
    }
}

            
  