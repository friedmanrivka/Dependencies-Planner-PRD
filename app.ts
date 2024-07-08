// import express from 'express';
// import pool from './src/config/db';

// const app = express();

// app.get('/users', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error not conented');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server isconected and  running on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import ProductmanagerRoutes from './src/routes/productManagerRoutes'
import GroupRoutes from './src/routes/groupRoutes';


dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.json());


app.use('/api', ProductmanagerRoutes);
app.use('/api',GroupRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});