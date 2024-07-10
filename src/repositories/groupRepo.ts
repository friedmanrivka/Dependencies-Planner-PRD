
import {pool2} from '../config/db';

export default class GroupRepo {
    
    static async getAllGroup(): Promise<{ name: string }[]> {
        try {
            console.log('Entering getAllGroup method');
            const result = await pool2.query('SELECT * FROM "group"');
            console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllGroup:', err);
            throw err;
        }
    }
}