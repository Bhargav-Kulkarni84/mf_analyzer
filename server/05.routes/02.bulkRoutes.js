import express from 'express';

// Calculator Utils
import { getRollingReturns } from '../04.calculator/01.rollingReturns.js';

//DB
import {pool} from '../01.db/01.createPool.js'

//Middleware
import authMiddleware from '../02.middlewares/01.authMiddleware.js'

//Helper
import catchAsync from '../03.errorHandlers/catchAsync.js';

const router = express.Router();

//Show all the funds from db.
router.get('/funds', authMiddleware, catchAsync(async (req, res) => {

    const fetchFunds = await pool.query(`SELECT * FROM fund_master LIMIT 500`);
    if(!fetchFunds.rows) throw new AppError("No funds found",404,"/funds");

    res.json(fetchFunds.rows);
}));



export default router;