import axios from 'axios';
import {pool} from "./01.createPool.js";

async function insertFunds(){

    //Get all the funds from mfapi
    const response = await axios.get('https://api.mfapi.in/mf');
    let funds = response.data;

    for(let i=0; i<funds.length; i++){

        const fund = funds[i];

        await pool.query(

            `
            INSERT INTO funds 
            (scheme_code,fund_name)    
            VALUES ($1,$2)
            ON CONFLICT (scheme_code) DO NOTHING
            `,
            [fund.schemeCode,fund.schemeName]
        );

    }
    console.log("Funds Inserted");
}

insertFunds();