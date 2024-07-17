import {pool} from '../config/db';
import {TShirt} from '../models/tShirtModel'
export default class TShirtRepo {
    static async getAllTShirt(): Promise<TShirt[]> {
        try {
          const result = await pool.query('select * from t_size');
          console.log(result.rows)
            return result.rows as TShirt[];
        } catch (err) {
            console.error('Error executing query in getAlltShirt:', err);
            throw err;
        }
    }
}
