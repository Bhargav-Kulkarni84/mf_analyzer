import express from 'express';
import { getRollingReturns } from '../calculator/01.rollingReturns.js';

//DB
import {pool} from '../db/01.createPool.js'

const router = express.Router();

//Show all the funds.
router.get('/', async (req, res) => {
  try {
    const fetchFunds = await pool.query(`SELECT * FROM funds LIMIT 500`);
    res.json(fetchFunds.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

//Find rolling return of a specific fund.
router.get('/rolling',async(req,res)=>{

  const {fundID,rollingYear} = req.query;
  const rollingReturnObj = await getRollingReturns(fundID,rollingYear);
  res.json(rollingReturnObj);
  
})

//Get a specific fund from the funds list.
router.get('/:id',async(req,res)=>{

  //Extract the fund code from the request parameters.
  const schemeCode = req.params.id;
  // console.log("Scheme Code = "+schemeCode);

  //Make fetch the fund from the db.
  const fetchFund = await pool.query(`SELECT * FROM funds WHERE scheme_code = $1`,[schemeCode]);
  const fund = fetchFund.rows;
  res.json(fund);

})


export default router;