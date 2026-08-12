//This piece of code get all the funds from MF API's and adds to the fund_master table in mfdb database if there exists no prior fund.

import axios from 'axios';
import {pool} from "../00.db/01.createPool.js";
import 'dotenv/config';

const MF_API_KEY = process.env.MF_API_KEY;

async function insertFunds(){

    try{
        //1.Get all the funds from mfapi
        const response = await axios.get(MF_API_KEY);
        let funds = response.data;
    
        //Iterate through each fund
        for(let i=0; i<funds.length; i++){
    
            const fund = funds[i];
    
            //Add funds to table with their scheme code and fund name.
            await pool.query(
                `
                INSERT INTO fund_master 
                (scheme_code,scheme_name)    
                VALUES ($1,$2)
                ON CONFLICT (scheme_code) DO NOTHING
                `,
                [fund.schemeCode,fund.schemeName]
            );
    
        }
    
        console.log("All funds from mf api inserted succesfully");

    }

    catch(e){
        console.error(e);
    }

    finally{
        await pool.end();
    }
    
}

export {insertFunds};