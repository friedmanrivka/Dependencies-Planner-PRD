import { pool } from '../config/db';
import { QueryResult } from 'pg';

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
