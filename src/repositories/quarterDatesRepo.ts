import { pool } from '../config/db';
import { CurrentQuarter } from '../models/CurrentQuarter';

export default class QuarterRepo {
  static async setCurrentQuarter(year: number, quarter: string, isCurrent: boolean): Promise<CurrentQuarter> {
    try {
      console.log(`Repository: Setting current quarter to year: ${year}, quarter: ${quarter}, isCurrent: ${isCurrent}`);
  
      // Reset any existing 'is_current' flags to false
      if (isCurrent) {
        await pool.query('UPDATE current_quarter SET is_current = false WHERE is_current = true');
      }
  
      // Insert the new current quarter with the given 'is_current' flag
      const insertResult = await pool.query(
        'INSERT INTO current_quarter (year, quarter, is_current) VALUES ($1, $2, $3) RETURNING *',
        [year, quarter, isCurrent]
      );
  
      // Ensure insertion was successful
      if (insertResult && insertResult.rowCount! > 0) {
        console.log('Repository: Current quarter set successfully', insertResult.rows[0]);
        return insertResult.rows[0] as CurrentQuarter;
      } else {
        throw new Error('Failed to insert new quarter');
      }
    } catch (err) {
      console.error('Repository: Error setting current quarter:', err);
      throw err;
    }
  }
    // static async setCurrentQuarter(year: number, quarter: string): Promise<CurrentQuarter> {
    //     try {
    //         console.log(`Repository: Setting current quarter to year: ${year}, quarter: ${quarter}`);

    //         const deleteResult = await pool.query('DELETE FROM current_quarter');

    //         const insertResult = await pool.query(
    //             'INSERT INTO current_quarter (year, quarter) VALUES ($1, $2) ',
    //             [year, quarter]
    //         );

    //         if (insertResult && insertResult.rowCount! > 0) {
    //             console.log('Repository: Current quarter set successfully', insertResult.rows[0]);
    //             return insertResult.rows[0] as CurrentQuarter;
    //         } else {
    //             throw new Error('Failed to insert new quarter');
    //         }
    //     } catch (err) {
    //         console.error('Repository: Error setting current quarter:', err);
    //         throw err;
    //     }
    // }
    static async getQuarter(): Promise<string[]> {
      try {
        const result = await pool.query(
          `
          SELECT year, quarter 
          FROM current_quarter 
          ORDER BY id DESC 
          LIMIT 4
          `
        );
  
        if (result && result.rowCount! > 0) { 
          const quarters = result.rows.map((row: CurrentQuarter) => `${row.year} ${row.quarter}`);
          console.log('Repository: Current quarters fetched successfully', quarters);
          return quarters;
        }
  
        return [];
      } catch (err) {
        console.error('Repository: Error fetching current quarters:', err);
        throw err;
      }
    }
  //   static async getCurrentQuarter(): Promise<string | null> {
  //     try {
  //         const result = await pool.query(
  //             'SELECT year, quarter FROM current_quarter WHERE is_current = true LIMIT 1'
  //         );

  //         if (result.rows.length > 0) {
  //             console.log('Repository: Current quarter fetched successfully', result.rows[0]);
  //             const currentQuarter = result.rows[0];
  //             return `${currentQuarter.year} ${currentQuarter.quarter}`;
  //         }

  //         return null; // Return null if no current quarter is found
  //     } catch (err) {
  //         console.error('Repository: Error fetching current quarter:', err);
  //         throw err;
  //     }
  // }
  static async getQ(): Promise<string | null> {
    try {
        const result = await pool.query(
            'SELECT year, quarter FROM current_quarter WHERE is_current = true LIMIT 1'
        );

        if (result.rows.length > 0) {
            console.log('Repository: Current quarter fetched successfully', result.rows[0]);
            const currentQuarter = result.rows[0];
            return `${currentQuarter.year} ${currentQuarter.quarter}`;
        }

        return null; // Return null if no current quarter is found
    } catch (err) {
        console.error('Repository: Error fetching current quarter:', err);
        throw err;
    }
}
}
