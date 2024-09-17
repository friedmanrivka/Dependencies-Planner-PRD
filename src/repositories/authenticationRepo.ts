import { pool } from '../config/db';

export default class AuthenticationRepo {
    
    static async getProductManagerByEmail(email: string): Promise<{ exists: boolean, isAdmin: boolean }> {
     
        try {
            console.log('Entering getProductManagerByEmail method');
            const result = await pool.query('SELECT is_admin FROM productmanager WHERE email = $1', [email]);

            // Use a non-null assertion for rowCount
            if ((result.rowCount as number) > 0) {
                return {
                    exists: true,
                    isAdmin: result.rows[0].is_admin // Make sure this matches your actual column name
                };
            }

            return { exists: false, isAdmin: false };
        } catch (err) {
            console.error('Error executing query in getProductManagerByEmail:', err);
            throw err;
        }
    }
}


// static async getProductManagerByEmail(email: string): Promise<boolean> {
    //     try {
    //         console.log('Entering getProductManagerByEmail method');
    //         const result = await pool.query('SELECT 1 FROM productmanager WHERE email = $1', [email]);
    //         console.log(result.rows);
    //         return result.rowCount !== null && result.rowCount > 0; 
    //     } catch (err) {
    //         console.error('Error executing query in getProductManagerByEmail:', err);
    //         throw err;
    //     }
    // }