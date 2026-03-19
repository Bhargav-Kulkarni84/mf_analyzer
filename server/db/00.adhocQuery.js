import { pool } from "./01.createPool.js";

async function addQuery(query){

    try{
        await pool.query(query);
        console.log("Table Updated");
    }
    catch(err){
        console.log(err);
    }

    finally{
        await pool.end();
    }

}

const query = `

    ALTER TABLE funds
    ADD COLUMN IF NOT EXISTS amc_name TEXT,
    ADD COLUMN IF NOT EXISTS scheme_type TEXT,
    ADD COLUMN IF NOT EXISTS scheme_category TEXT,
    ADD COLUMN IF NOT EXISTS isin_growth TEXT,
    ADD COLUMN IF NOT EXISTS isin_div_reinvestment TEXT,
    ADD COLUMN IF NOT EXISTS plan_type TEXT,
    ADD COLUMN IF NOT EXISTS return_type TEXT,
    ADD COLUMN IF NOT EXISTS dividend_frequency TEXT;
`
;

addQuery(query);