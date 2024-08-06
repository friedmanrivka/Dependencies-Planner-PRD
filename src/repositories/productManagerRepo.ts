import { QueryResult } from 'pg';
import { pool } from '../config/db';
import { ProductManager } from '../models/productManagerModel'
import GroupRepo from './groupRepo'
import { TransformedProductManager } from '../models/transformedProductManager '
import { Group } from '../models/groupModel'
export default class ProductManagerRepo {
    static async deleteRequestById(id: number): Promise<void> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query('DELETE FROM affectedgroups WHERE requestid = $1', [id]);
            console.log(`Deleting affected groups with requestId: ${id}`);
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
    static async addProductManager(email: string, productmanagername: string): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO productmanager (email,productmanagername, is_admin) VALUES ($1, $2,false)`,
                [email, productmanagername]
            );
        } catch (err) {
            console.error('Error adding product manager:', err);
            throw err;
        }
    }
    static async addAdmin(email: string, productManagerName: string): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO productmanager (email, productmanagername, is_admin) VALUES ($1, $2, true)`,
                [email, productManagerName]
            );
        } catch (err) {
            console.error('Error adding admin:', err);
            throw err;
        }
    }
    
    //?????????????????????????????????????????????????????????
    static async requestExists(id: number): Promise<boolean> {
        try {
            const result: QueryResult = await pool.query('SELECT 1 FROM request WHERE id = $1', [id]);
            return result.rowCount ? result.rowCount > 0 : false;
        } catch (err) {
            console.error('Error checking if request exists in requestExists:', err);
            throw err;
        }
    }
    static async deleteProductManagerByEmail(email: string): Promise<void> {
        try {
            await pool.query(
                `DELETE FROM productmanager WHERE email = $1`,
                [email]
            );
        } catch (err) {
            console.error('Error deleting product manager:', err);
            throw err;
        }
    }
 
 static async getAllProductManagers(): Promise<TransformedProductManager[]> {
        try {
            console.log('Entering getAllProductManagers method');

            const result = await pool.query(`
                SELECT
                    pm.email,
                    pm.productmanagername,
                    pm.groupid
                FROM productmanager pm
            `);

            console.log('Product Manager Query executed successfully, result:', JSON.stringify(result.rows, null, 2));

            const productManagers = result.rows;
            const groups = await GroupRepo.getAllGroup();

            console.log('Groups fetched successfully:', JSON.stringify(groups, null, 2));

            const transformedProductManagers = productManagers.map(pm => {
                console.log('Processing product manager:', JSON.stringify(pm, null, 2));

                const groupNames = (pm.groupid || []).map((gid: number) => {
                    const group = groups.find((g: any) => g.id === gid);
                    return group ? group.name : 'Unknown Group';
                });

                return {
                    email: pm.email,
                    productManagerName: pm.productmanagername,
                    groupNames
                };
            });

            console.log('Transformed product managers:', JSON.stringify(transformedProductManagers, null, 2));

            return transformedProductManagers;
        } catch (err) {
            console.error('Error fetching product managers:', err);
            throw err;
        }
    }
    static async updateProductManagerName(email: string, productManagerName: string): Promise<void> {
        try {
          await pool.query(
            `UPDATE productmanager SET productmanagername = $1 WHERE email = $2`,
            [productManagerName, email]
          );
        } catch (err) {
          console.error('Error updating product manager name:', err);
          throw err;
        }
      }
      static async addGroupToManager(email: string, groupName: string): Promise<void> {
        try {
         
          const groups: Group[] = await GroupRepo.getAllGroup();
    
          const group = groups.find((group) => group.name === groupName);
    
          if (!group) {
            throw new Error('Group not found');
          }
    
          const groupId = group.id;
    
          await pool.query(
            `UPDATE productmanager
             SET groupid = array_append(groupid, $1::integer)
             WHERE email = $2 AND NOT groupid @> ARRAY[$1::integer]`,
            [groupId, email]
          );
    
          console.log('Repository: Group ID added successfully');
        } catch (err) {
          console.error('Repository: Error adding group ID:', err);
          throw err; // Rethrow to be handled by the controller
        }
      }
      static async removeGroupFromManager(email: string, groupName: string): Promise<void> {
        try {
          // Retrieve all groups using the existing getAllGroup function
          const groups: Group[] = await GroupRepo.getAllGroup();
    
          // Find the group by name to get its ID
          const group = groups.find((group) => group.name === groupName);
    
          if (!group) {
            throw new Error('Group not found');
          }
    
          const groupId = group.id;
    
          // Update the product manager's groupid array to remove the group ID
          await pool.query(
            `UPDATE productmanager
             SET groupid = array_remove(groupid, $1::integer)
             WHERE email = $2 AND groupid @> ARRAY[$1::integer]`,
            [groupId, email]
          );
    
          console.log('Repository: Group ID removed successfully');
        } catch (err) {
          console.error('Repository: Error removing group ID:', err);
          throw err; // Rethrow to be handled by the controller
        }
      }
    }




