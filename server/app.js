import express from "express";
import 'dotenv/config'
import getFund from './routes/01.getFund.js'

//Authentication
import authRoutes from './routes/02.authRoutes.js'
import cookieParser from "cookie-parser";

import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/fund', getFund);

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
  res.send("Server Is Accessible")
})

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});