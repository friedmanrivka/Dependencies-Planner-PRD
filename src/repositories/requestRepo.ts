import {pool} from '../config/db';

export default class RequestRepo {
    static async getAllDescriptions(): Promise<{ description: string }[]> {
        try {
            console.log('Entering getAllDescriptions method');
            const result = await pool.query(' SELECT pr.productmanagername, r.title, r.comment, r.description, r.planned, r.jiralink, p.name, f.decision  FROM finaldecision f JOIN request r ON f.id = r.finaldecision JOIN priority p ON r.priority_id = p.id JOIN productmanager pr ON r.productmanagerid = pr.email;');
           console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllDescriptions:', err);
            throw err;
        }
    }

    static async getAllComments (): Promise<{ comment: string }[]> {
        try {
            console.log('Entering getAllcComments method');
            const result = await pool.query('SELECT comment FROM request');
            console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllComments :', err);
            throw err;
        }
    }

    static async getAllTitels(): Promise<{ title: string }[]> {
        try {
            console.log('Entering getAllDescriptions method');
            const result = await pool.query('SELECT title FROM request');
            console.log('Query executed successfully, result:', result.rows);
            return result.rows;
        } catch (err) {
            console.error('Error executing query in getAllTitle:', err);
            throw err;
        }
    }
    
}
