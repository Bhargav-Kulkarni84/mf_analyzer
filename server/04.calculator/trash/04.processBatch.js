//This function receives all the batch along with current batch index.
//It then divides the batch into the batch and add details to each fund.

import fs from 'fs/promises'
import { addFundDetails } from "./04d.addFundDetails.js";

import { wait } from "./utils/00.wait.js"
import { wrap } from "./utils/03.wrap.js";
import { retryFailedFunds } from './05b.retryFailedFunds.js';
import { debugLog} from '../logger/01.debugLog.js'

async function processBatch(batch,batchNo){

    try{
        //1.Array to store all the failed insertions.
        let failedFundIndexes = [];
        let failedPromises = [];

        //2.Create an array to store the promises returned from each of 10 batch within a batch.
        let fundBatchPromises = [];

        //3.Add details for individual fund of batch.
        for(let i=0; i<batch.length; i++){
            const fund = batch[i];
            const index = i;
            const fundPromise = addFundDetails(fund);
            fundBatchPromises.push(wrap(fundPromise,index)); 
        }

        //4.Wait until all the promises gets fulfilled.
        let results = await Promise.all(fundBatchPromises);

        //5.Loop through all the responses of promises.
        results.forEach((result)=>{
            if(result.status === "failed"){
                //add the fund index for which the insertion failed.
                failedFundIndexes.push(result.index);
            }
        })

        //Retry all the failed batch.
        if(failedFundIndexes.length !== 0) await retryFailedFunds(failedFundIndexes,batch);

        console.log(`Batch - ${batchNo} successfully inserted`);

    }
    catch(e){
        await debugLog("05a.processBatch.js",45,"Error during retrying...",e);
    }
   
}

export {processBatch};

