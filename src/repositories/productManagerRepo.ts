import {pool }from '../config/db';

export default class ProductManagerRepo {
    static async getAllProductManagerNames(): Promise<{ productmanagername: string }[]> {
        try {
            console.log('Entering getAllProductManagerNames method');
            const result = await pool.query('SELECT productmanagername FROM productmanager');
            // console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllProductManagerNames:', err);
            throw err;
        }
    }
}


