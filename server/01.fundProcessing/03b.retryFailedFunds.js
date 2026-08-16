/*
    1.This fund receives indexes of all the funds that failed during initial processing.
    
    2.It then retries processing these batches 3 times with a delay of 5secs. 

    3.If any fund fails after three retries then the failed funds will be logged to a json file for displaying on the admin dashboard;
*/

import { addFundDetails } from "./04.addFundDetails.js";
import { wrap } from "./utils/03.wrap.js";
import { wait } from "./utils/00.wait.js";
import { logFailedFunds } from "../06.logger/02.logFailedFunds.js";

const retryLimit = 3;

async function retryFailedFunds(failedFunds,batch){

    if(failedFunds.length === 0) return failedFunds;

    //Array to store all the failed insertions.
    let fundBatchPromises = [];

    //Keep retrying until we cross retry threshold or all the batch are resolved.
    let retryCount = 0;
   
    while(failedFunds.length > 0 && retryCount<retryLimit){

        //wait for 5 seconds before making a retry request;
        console.log("Retrying...");

        //Increment the retry limit counter.
        // console.log(`Retry #${retryCount+1} for ${failedFundIndexes.length} batch`);
        retryCount++;
        
        //Do linear backoff.
        await wait(5000 * retryCount);

        //Loop through each index of failed fund and add it to the fundBatchPromises array.
        failedFunds.forEach((failedFund) => {
            const fundPromise = addFundDetails(failedFund.fund);
            fundBatchPromises.push(wrap(fundPromise,failedFund.index)); 
        })
        
        //Check if any batch failed again;
        const results = await Promise.all(fundBatchPromises);

        //Clear the previous failed insertions and promises array to insert new entries.
        failedFunds = [];
        fundBatchPromises = [];

        //Loop through all the fullfilled promises.
        results.forEach((promise)=>{

            //Check if promise rejected (fund failed.
            if(promise.status === "failed"){
                
                //If fund has failed, add the failed fund index.
                failedFunds.push(
                    {
                        fund : batch[promise.index],
                        index : promise.index,
                        error: promise.error?.message || String(promise.error)
                    }
                );
                
            };

        })

    }

    // Anything remaining after 3 retries is permanently failed
    if (failedFunds.length > 0) {
        await logFailedFunds(failedFunds, batch);
    }

    return failedFunds;
}

export {retryFailedFunds};



