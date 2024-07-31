import {pool2} from '../config/db';
import {Group} from '../models/groupModel'

export default class GroupRepo {   

    static async getAllGroup(): Promise<Group[]> {

        try {
            console.log('Entering getAllGroup method');
            const result = await pool2.query('SELECT * FROM "group"');
            console.log('Query executed successfully, result:', result.rows);
            return result.rows as Group[];
        } catch (err) {
            console.error('Error executing query in getAllGroup:', err);
            throw err;
        }

    }
    static async addGroup(groupName: string): Promise<void> {
        try {
          console.log('Entering addGroup method');
          await pool2.query('INSERT INTO "group" (name) VALUES ($1)', [groupName]);
          console.log('Group added successfully');
        } catch (err) {
          console.error('Error adding group:', err);
          throw err;
        }
      }
      
      static async deleteGroup(groupId: number): Promise<void> {
        try {
            await pool2.query('DELETE FROM "group" WHERE id = $1', [groupId]);
        } catch (err) {
            console.error('Error deleting group:', err);
            throw err;
        }
    }
    
   

}