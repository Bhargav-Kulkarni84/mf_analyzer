import express from 'express'
import axios from 'axios'
import fs from 'fs/promises';


const router = express.Router();

router.get('/',async(req,res)=>{

  let funds = await fs.readFile('./routes/funds.txt')
  funds = JSON.parse(funds);
  res.json({fund : funds});
  
})

//Show all the funds.

router.get('/',async(req,res)=>{

  //Get all the funds from API.
  let funds = await fs.readFile('./routes/funds.txt')
  funds = JSON.parse(funds);

  //Send the Response as JSON.
  res.json(funds);

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

router.post('/fundname',async(req,res)=>{

  //Get the fund name.
  const fundName = req.body.fundName;

  //Get the fund from file or api.
  // let funds = await axios.get('https://api.mfapi.in/mf');
  // funds = funds.data;

  //Read file containing all funds.
  let funds = await fs.readFile('./routes/funds.txt')
  funds = JSON.parse(funds);

  //Search for the fundName entered by user in given funds.
  
  let fundObj = {};

  funds.forEach(fund => {
      let name = fund.schemeName;

      if(name === fundName){
        //Add the fund name and fund code.
      
        fundObj = {name:fund.schemeName, code:fund.schemeCode};
     
      }

  });

  if(fundObj === null){
    return res.send("Invalid Fund Name Please Enter Again");
  }

  return  res.json(fundObj);

})

export default router;