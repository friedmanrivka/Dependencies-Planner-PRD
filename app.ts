import express from 'express';
import dotenv from 'dotenv';
import requestRoutes from './src/routes/requestRoutes'
import priorityRoutes from './src/routes/priorityRoutes'
import ProductManageRoutes from './src/routes/productManagerRoutes';
import finalDesicion from './src/routes/filnalDesicionRoutes'
import statusRoutes from './src/routes/statusRoutes'
import newRequest from './src/routes/newRequestRouter';
import AuthenticationRoutes  from './src/routes/AuthenticationRoutes'
import exportRoutes from './src/routes/exportRoutes'; 
import deleteRouter from './src/routes/deleteRouter'
import groupRoutes from './src/routes/groupRoutes';
import quarterDatesRoutes from './src/routes/quarterDatesRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 

dotenv.config();
const app = express();
const port = process.env.EXPRESS_PORT || 3001
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // This allows requests from your frontend at http://localhost:3000
  credentials: true, // Allows cookies to be sent with requests
}));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

app.use(express.json());
app.use(cookieParser());
app.options('*', (req, res) => {
  res.sendStatus(204); // שולח תשובת OK ל-OPTIONS
});
console.log('i am in app file');
app.use('/api', deleteRouter);
app.use('/api', requestRoutes);
app.use('/api',priorityRoutes)
app.use('/api',ProductManageRoutes);
app.use('/api', quarterDatesRoutes);
app.use('/api',finalDesicion);
app.use('/api',statusRoutes);
app.use('/api',AuthenticationRoutes);
app.use('/api',newRequest);
app.use('/api',exportRoutes);
app.use('/api',groupRoutes);
app.use('/api',quarterDatesRoutes);
