//This scripts get all the funds from MF API's and adds to the fund_master table in mfdb database.

import axios from 'axios';
import {pool} from "./01.createPool.js";

async function insertFunds(){

    try{
        //1.Get all the funds from mfapi
        const response = await axios.get('https://api.mfapi.in/mf');
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
    
        console.log("Funds Inserted");

    }
    catch(e){
        console.error(e);
    }
    finally{
        await pool.end();
    }
}

export {insertFunds};