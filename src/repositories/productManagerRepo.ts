
import { QueryResult } from 'pg';



   

import {pool }from '../config/db';
import {ProductManager} from '../models/productManagerModel'
export default class ProductManagerRepo {
        static async deleteRequestById(id: number): Promise<void> {
        const client = await pool.connect();
        try {
           await client.query('BEGIN');
            await client.query('DELETE FROM affectedgroups WHERE requestid = $1', [id]);
            console.log(`Deleting affected groups with requestId: ${id}`);
            await client.query('DELETE FROM request_affected_groups WHERE request_id = $1', [id]);
            console.log(`Deleting request with id: ${id}`);
            await client.query('DELETE FROM request WHERE id = $1', [id]);
            await client.query('COMMIT');
            console.log('Deletion successful');
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Error executing deletion in deleteRequestById:', err);
            throw err;
        } finally {
            client.release();
        }
    }

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
    static async getAllProductManagerEmails(): Promise<ProductManager[]> {
        try {
            console.log('Entering getAllProductManagerEmails method');
            const result = await pool.query('SELECT email FROM productmanager');
          
            return result.rows as ProductManager[];
        } catch (err) {
            console.error('Error executing query in getAllProductManagerNames:', err);
            throw err;
        }
    }
    static async addProductManager( email: string,productmanagername: string,): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO productmanager (email,productmanagername) VALUES ($1, $2)`,
                [ email,productmanagername]
            );
        } catch (err) {
            console.error('Error adding product manager:', err);
            throw err;
        }
    }
    static async requestExists(id: number): Promise<boolean> {
        try {
            const result: QueryResult = await pool.query('SELECT 1 FROM request WHERE id = $1', [id]);
            return result.rowCount ? result.rowCount > 0 : false;
        } catch (err) {
            console.error('Error checking if request exists in requestExists:', err);
            throw err;
        }
    }
}




