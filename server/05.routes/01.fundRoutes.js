import express from 'express';
import { getRollingReturns } from '../04.calculator/01.rollingReturns.js';

//DB
import {pool} from '../01.db/01.createPool.js'

//Middleware
import authMiddleware from '../02.middlewares/01.authMiddleware.js'

//ErrorCatcher
import catchAsync from '../03.errorHandlers/catchAsync.js'
import AppError from '../03.errorHandlers/AppError.js';

const router = express.Router();

//Get a specific fund from the funds list.
router.get('/:id',authMiddleware,async(req,res)=>{

  //Extract the fund code from the request parameters.
  const schemeCode = req.params.id;
  // console.log("Scheme Code = "+schemeCode);

  //Make fetch the fund from the db.
  const fetchFund = await pool.query(`SELECT * FROM fund_master WHERE scheme_code = $1`,[schemeCode]);
  const fund = fetchFund.rows;
  res.json(fund);

})

//Find rolling return of a specific fund.
router.get('/:id/rolling',authMiddleware,async(req,res)=>{

  const {fundID,rollingYear} = req.query;
  const rollingReturnObj = await getRollingReturns(fundID,rollingYear);
  res.json(rollingReturnObj);
  
})


export default router;