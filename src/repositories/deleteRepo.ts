import { pool } from '../config/db';
import { QueryResult } from 'pg';

export default class ProductManagerRepo {
    static async deleteRequestById(id: number): Promise<void> {
        try {
            await pool.query('DELETE FROM affectedgroups WHERE requestId = $1', [id]);
            console.log(`Deleting Request with id: ${id}`);
            await pool.query('DELETE FROM request WHERE id = $1', [id]);
            console.log('Deletion successful');
        } catch (err) {
            console.error('Error executing deletion in deleteRequestById:', err);
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
