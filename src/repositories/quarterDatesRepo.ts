import { pool } from '../config/db';
import { CurrentQuarter } from '../models/CurrentQuarter';

export default class QuarterRepo {
    // Function to set the current quarter
    static async setCurrentQuarter(year: number, quarter: string): Promise<CurrentQuarter> {
        try {
            console.log(`Repository: Setting current quarter to year: ${year}, quarter: ${quarter}`);

            // Clear previous quarter entries
            const deleteResult = await pool.query('DELETE FROM current_quarter');

            // Insert new quarter
            const insertResult = await pool.query(
                'INSERT INTO current_quarter (year, quarter) VALUES ($1, $2) ',
                [year, quarter]
            );

            // Ensure insertResult.rowCount is checked for a valid return
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

    // Function to get the current quarter
    
    static async getCurrentQuarter(): Promise<string[]> {
      try {
        const result = await pool.query(
          `
          SELECT year, quarter 
          FROM current_quarter 
          ORDER BY id DESC 
          LIMIT 4
          `
        );
  
        if (result && result.rowCount! > 0) { // Use non-null assertion
          // Transform the results into the desired format
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
}
