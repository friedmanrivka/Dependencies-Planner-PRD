import { pool } from '../config/db';

export default class AuthenticationRepo {
    static async getProductManagerByEmail(email: string): Promise<boolean> {
        try {
            console.log('Entering getProductManagerByEmail method');
            const result = await pool.query('SELECT 1 FROM productmanager WHERE email = $1', [email]);
            console.log(result.rows);
            return result.rowCount !== null && result.rowCount > 0; 
        } catch (err) {
            console.error('Error executing query in getProductManagerByEmail:', err);
            throw err;
        }
    }
}
