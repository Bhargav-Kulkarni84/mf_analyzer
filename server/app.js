import express from "express";
import 'dotenv/config'

//DB
import { pool } from "./01.db/01.createPool.js";

//Routers
import fundRoutes from './05.routes/01.fundRoutes.js'
import bulkRoutes from './05.routes/02.bulkRoutes.js'

//Authentication
import authRoutes from './05.routes/00.authRoutes.js'
import cookieParser from "cookie-parser";

//Middlewares
import cors from 'cors';
import ErrorHandlerMiddleware from './02.middlewares/02.ErrorHandlerMiddleware.js'
import authMiddleware from "./02.middlewares/01.authMiddleware.js";

//Helper
import catchAsync from "./03.errorHandlers/catchAsync.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/',bulkRoutes)
app.use('/user', authRoutes);
app.use('/fund', fundRoutes);

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
  res.send("Server Is Accessible")
})


//Global Error Handler.
app.use(ErrorHandlerMiddleware)


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

