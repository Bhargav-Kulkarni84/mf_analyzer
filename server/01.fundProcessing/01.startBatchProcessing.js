import { pool } from "../00.db/01.createPool.js";
import { createBatch } from "./02.createBatch.js";
import { insertFunds } from "./03.insertFunds.js";

async function startBatchProcessing(){

    //Insert all new funds if any from mfapi to db.
    await insertFunds();

    //Select every entry from the funds table for which nav data hasn't been downloaded or nav data downloaded a day ago.
    let funds = [];

    try{
        
        const result = await pool.query(`
            SELECT 
            fm.id,fm.scheme_code,fm.scheme_name 
            FROM fund_master fm
            JOIN
            fund_processing_status fps
            ON
            fm.id = fps.fund_id AND fps.is_active = TRUE
            WHERE fps.last_data_download is NULL 
            OR  
            fps.last_data_download < NOW() - INTERVAL '1 day'
            ORDER BY fm.id;`
        );

        funds = result.rows;

    }

    catch(e){
        console.log(`Error while fetching funds for processing from database. ${e.message}`);
    }
    
    if(funds.length === 0){
        console.log("No funds found for which the data is not downloaded\n");
        console.log(`Error starting batch processing.\n`);
        return;
    } 

    console.log("Starting data pipeline...");
    await createBatch(funds);
    console.log("Data pipeline completed");

}

export {startBatchProcessing}