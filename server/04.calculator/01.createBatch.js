import {pool} from '../00.db/01.createPool.js' 
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
            OR fps.last_returns_calculated < fps.last_data_download);`
        )

    const funds = result.rows;

    if(funds.length === 0){
        console.log("No funds found for which nav insertion date > last_data_download date");
        throw new AppError(`No funds found for which nav insertion date > last_data_download date`,500);
    }

    //Create a batch of 100 funds;
    let batchSize = 100;
    let batchCount = 1;

    const batches = Math.ceil((funds.length/batchSize));

    for(let i=0; i<funds.length; i+=batchSize){

        const batch = funds.slice(i,i+batchSize);
        console.log(`Processing batch - ${batchCount} / ${batches}`);

        try{
            await processBatch(batchCount,batch);
        }
        catch(e){
            console.log(`ERROR PROCESSSING RETURNS CALCULATION FOR FUND WITH SCHEME CODE ${funds[i].scheme_code}`);
            console.log(`${e}`);
            console.log(`Reason : ${e.messsage}`);
        }

        batchCount++;

    }

}




export {createBatch}