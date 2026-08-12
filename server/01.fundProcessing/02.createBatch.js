/*
    This function do batching, it picks 10 funds from the entire available funds and processes them.
*/

import {pool} from '../00.db/01.createPool.js'
import { processBatch } from "./03a.processBatch.js";
import { wait } from './utils/00.wait.js';

import { debugLog } from '../06.logger/01.debugLog.js';

async function createBatch(funds){

    //1.Initialize timer to compute the time for processing all the fund.
    let startTime = Date.now();

    //2.Divide all the 37k funds in a batch of 10. (ie 3.7k batches).
    const totalBatches = Math.ceil(funds.length/10);

    for(let batchIdx=0; batchIdx<funds.length; batchIdx+=10){

        //a.Variable to track current batch number.
        let batchNo = (batchIdx/10)+1;

        //b.Create a batch of funds.
        const batch = funds.slice(batchIdx,batchIdx+10);

        //c.Process current batch.
        console.log(`Processing Batch-${batchNo} out of ${totalBatches}`);
        try{
            await processBatch(batch,batchNo);
        }
        catch(e){
            console.log(`Error while processing batch-${batchNo} , message = ${e.message}.\n`);
        }

        //d.Log progress status.
        const percent =((batchNo / totalBatches) * 100).toFixed(2);
        console.log(`Progress: ${percent}%`);

        //Wait 5 Seconds Before Creating a new batch.
        await wait(5) ;

    }

    //3.Log the batching summary.
    console.log("PIPELINE SUMMARY");

    // a.Get total funds, failed funds
    let result = 0;
    let failedFunds = 0;

    try{
        result = await pool.query(`SELECT COUNT(*) AS count FROM fund_processing_status WHERE retry_count = 3`);
        failedFunds = Number(failedResult.rows[0].count);
    }
    catch(e){
        console.log("Couldn't get the funds for which the processing failed, assuming it to be 0");
        console.log(e);
    }
    
    const total = funds.length;    
    const successful = total - failed;
    
    //b.Compute total time taken.
    let endTime = Date.now();
    const timeTaken = ((endTime - startTime) / (1000 * 60 * 60)).toFixed(2);;

    console.log(`Total Funds : ${total}\n`);
    console.log(`SuccessfulFunds : ${successful}\n`);
    console.log(`Failed : ${failed}\n`);
    console.log(`Success Rate : ${(successful/total)*100}%\n`);
    console.log(`Time Taken : ${timeTaken} hrs\n or (${timeTaken*60} min) `);


}


export {createBatch};
