// // const getProductManagerByEmail = async (email) => {
// //     try {
// //       const productManager = await ProductManager.findOne({
// //         where: { email },
// //       });
// //       return !!productManager; // returns true if email exists, false otherwise
// //     } catch (err) {
// //       throw err;
// //     }
// //   };

// //   module.exports = {
// //     getProductManagerByEmail,
// //   };
// import { pool } from '../config/db';
// import { ProductManager } from '../models/productManagerModel'
// export default class AuthenticationRepo {
//     // static async findUserByEmail(email: string) {
//         // const result = await pool.query('SELECT 1 FROM productmanager WHERE email = $1') ;
//         // const values=[email];
//         // console.log('Query result:', result.rows);

// const getProductManagerByEmail = async (email) => {
//     const query = 'SELECT 1 FROM productmanager WHERE email = $1';
//     const values = [email];
  
//     try {
//       const res = await pool.query(query, values);
//       return res.rowCount > 0; // returns true if email exists, false otherwise
//     } catch (err) {
//       throw err;
//     }
//   };


//         // console.log('Entering findUserByEmail method repo');
//         // try {
//         //     const result = await pool.query('SELECT * FROM productmanager WHERE email = $1', [email]);
//         //     console.log('Query result:', result.rows);
//         //     return result.rows[0] as ProductManager; 
//         // } catch (err) 
//         //     console.error('Error querying product manager by email:', err);
//         //     throw err;
//         // }
//     }
// }
// productManagerRepo.js
// productManagerRepo.js
import { pool } from '../config/db';

export default class AuthenticationRepo {
    static async getProductManagerByEmail(email: string): Promise<boolean> {
        try {
            console.log('Entering getProductManagerByEmail method');
            const result = await pool.query('SELECT 1 FROM productmanager WHERE email = $1', [email]);
            console.log(result.rows);
            return result.rowCount !== null && result.rowCount > 0; // returns true if email exists, false otherwise
        } catch (err) {
            console.error('Error executing query in getProductManagerByEmail:', err);
            throw err;
        }
    }
}
