import express from 'express';
import dotenv from 'dotenv';
import requestRoutes from './src/routes/requestRoutes'
import groupRoutes from './src/routes/groupRoutes'
import priorityRoutes from './src/routes/priorityRoutes'
import ProductManageRoutes from './src/routes/productManagerRoutes';
import quarterDatesRoutes from './src/routes/quarterDatesRoutes';
import finalDesicion from './src/routes/filnalDesicionRoutes'
dotenv.config();
const app = express();
const port = process.env.EXPRESS_PORT || 3000;
app.use(express.json());

app.use('/api', requestRoutes);
app.use('/api',groupRoutes);
app.use('/api',priorityRoutes)
app.use('/api',ProductManageRoutes);
app.use('/api', quarterDatesRoutes);
app.use('/api',finalDesicion)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})