import {pool }from '../config/db';
import {ProductManager} from '../models/productManagerModel'
export default class ProductManagerRepo {
    static async getAllProductManagerNames(): Promise<ProductManager[]> {
        try {
            console.log('Entering getAllProductManagerNames method');
            const result = await pool.query('SELECT productmanagername FROM productmanager');
          
            return result.rows as ProductManager[];
        } catch (err) {
            console.error('Error executing query in getAllProductManagerNames:', err);
            throw err;
        }
    }
}


