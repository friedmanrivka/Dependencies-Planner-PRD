import {pool} from '../config/db';

export default class FinalDesicionRepo {
    static async getAllFinalDesicion(): Promise<{ decision: string }[]> {
        try {
            console.log('Entering getAllFilnalDesicion method');
            const result = await pool.query('SELECT  decision FROM finaldecision');
          console.log(result.rows)
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllFilnalDesicion:', err);
            throw err;
        }
    }
}



