import express from 'express'
import axios from 'axios'
import fs from 'fs/promises';
import { getRollingReturns } from '../calculator/rollingreturns.js';

const router = express.Router();

//Show all the funds.
router.get('/',async(req,res)=>{

  // let funds = await fs.readFile('./routes/funds.txt')
  // fundData = JSON.parse(funds);
  // res.json(fundData);

  //Get all the funds from API
   
  let fund = await axios.get('https://api.mfapi.in/mf');
  //Send the Response as JSON.
  const fundData = fund.data;
  res.json(fundData);

})

router.get('/rolling',async(req,res)=>{

  const {fundID,rollingYear} = req.query;
  const rollingReturnObj = await getRollingReturns(fundID,rollingYear);
  res.json(rollingReturnObj);
  
})

//Get a specific fund from the funds list.
router.get('/:id',async(req,res)=>{

  //Extract the fund code from the request parameters.
  const fundCode = req.params.id;
  console.log("Fund Code = "+fundCode);

  //Make an api request to get the fund details from mf api.
  const response = await axios.get(`https://api.mfapi.in/mf/${fundCode}`);
  const fundDetails = response.data;
  res.json(fundDetails);

})


export default router;