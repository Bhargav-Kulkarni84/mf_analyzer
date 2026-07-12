import {pool} from '../01.db/01.createPool.js' 
import { processBatch } from './02.processBatch.js';
import AppError from '../03.errorHandlers/AppError.js';

/*
    Fetch all the funds for which 
    either 
    1.The last_returns_calculated is null. 
    or
    2.The last_returns_calculated < 1 month (last nav data download).
*/

async function createBatch(){

    try{

        const result = await pool.query(`
            SELECT 
                fm.id,
                fm.scheme_code,
                fps.fund_id
            FROM fund_master fm 
            JOIN fund_processing_status fps 
            ON fps.fund_id = fm.id
            WHERE fps.is_active = TRUE
            AND(
                fps.last_returns_calculated is NULL 
                OR fps.last_returns_calculated < fps.last_data_download - INTERVAL '30 days'
        );`)

        const funds = result.rows;

        if(funds.length === 0){
            console.log("No funds found for which nav insertion date > last_data_download date");
            throw new AppError(`No funds found for which nav insertion date > last_data_download date`,500);
        }

        //Create a batch of 100 funds;
        let batchSize = 100;

        let batchCount = 1;

        for(let i=0; i<funds.length; i+=batchSize){
            const batch = funds.slice(i,i+batchSize);
            await processBatch(batchCount,batch);
            batchCount++;
        }

    }

    catch(e){
        //Throw the error again to reach to the top error handler.
        throw new AppError(e.message,e.statusCode);
        // console.log("ERROR FROM CREATE BATCH FILE", e.message);
    }
}




export {createBatch}