import { pool } from '../config/db';
export default class AuthenticationRepo {
  
    static async getProductManagerByEmail(email: string): Promise<{ exists: boolean, isAdmin: boolean }> { try {
            console.log('Entering getProductManagerByEmail method');
            const result = await pool.query('SELECT is_admin FROM productmanager WHERE email = $1', [email]);
            console.log('Repo: DB result:', result.rows);
              if ((result.rowCount as number) > 0) {
                return {
                    exists: true,
                    isAdmin: result.rows[0].is_admin 
                };
            }

            return { exists: false, isAdmin: false };
        } catch (err) {
            console.error('Error executing query in getProductManagerByEmail:', err);
            throw err;
        }
    }
}
