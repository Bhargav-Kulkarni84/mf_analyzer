/*
    This function receives a batch of fund (10 funds) along with current batch index.
    It then takes individual funds from the batches and starts adding the details of each fund.
*/

import fs from 'fs/promises'
import { addFundDetails } from "./04.addFundDetails.js";

import { wait } from "./utils/00.wait.js"
import { wrap } from "./utils/03.wrap.js";
import { retryFailedFunds } from './03b.retryFailedFunds.js';
import { debugLog } from '../06.logger/01.debugLog.js'

async function processBatch(batch,batchNo){

    try{
        //1.Array to store all the failed insertions.
        let failedFunds = [];

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
        results.forEach((promise)=>{
            if(promise.status === "failed"){
                //Add the fund index for which the insertion failed.
                failedFunds.push({
                    fund : batch[promise.index],
                    index : promise.index,
                    error: promise.error,
                })
            }
        })

        //Retry all the failed batch.
        const remainingFailures = await retryFailedFunds(failedFunds, batch);

        if (remainingFailures.length === 0) {
            console.log(`Batch - ${batchNo} successfully inserted`);
        }

        else{
            console.log(`Batch - ${batchNo} completed with ${remainingFailures.length} failed funds`);
        } 


    }
    catch(e){
        console.log(`05a.processBatch.js",50,"Error during retrying... message = ${e.message}`);
    }
   
}

export {processBatch};

