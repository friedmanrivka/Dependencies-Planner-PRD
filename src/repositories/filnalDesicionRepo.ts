import {pool} from '../config/db';
import {finalDecision} from '../models/finalDecisionModel'

export default class FinalDesicionRepo {
    static async getAllFinalDesicion(): Promise<finalDecision[]> {
        try {
            console.log('Entering getAllFilnalDesicion method');
            const result = await pool.query('SELECT  decision FROM finaldecision');
          console.log(result.rows)
            return result.rows as finalDecision[];
        } catch (err) {
            console.error('Error executing query in getAllFilnalDesicion:', err);
            throw err;
        }
    }
}



