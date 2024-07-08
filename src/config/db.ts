import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log('Database user:', process.env.PGUSER);
console.log('Database host:', process.env.PGHOST);
console.log('Database name:', process.env.PGDATABASE);
console.log('Database password:', process.env.PGPASSWORD); 
console.log('Database port:', process.env.PGPORT);

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
 password: process.env.PGPASSWORD, 
  port: Number(process.env.PGPORT),
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
});

export default pool;
