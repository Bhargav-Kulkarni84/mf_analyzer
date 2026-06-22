import { addFundDetails } from "./04d.addFundDetails.js";
import fs from 'fs/promises'
import { wrap } from "./utils/03.wrap.js";
import { wait } from "./utils/00.wait.js";
import { pool } from "./01.createPool.js";
import { logFailedFunds } from "../logger/02.logFailedFunds.js";

const retryLimit = 3;

async function retryFailedFunds(failedFundIndexes,batch){

    //Array to store all the failed insertions.
    let retryPromises = [];

    //Keep retrying until we cross retry threshold or all the batch are resolved.
    let retryCount = 0;
   
    while(failedFundIndexes.length > 0 && retryCount<retryLimit){

        //Array to store the rejected batch with error message for this iteration.
        let rejectedFunds = [];

        //wait for 5 seconds before making a retry request;
        console.log("Retrying in ...")
        for(let i=5; i>0; i--){
            console.log("%d secs",i);
            await wait(1000);
        }

        //Increment the retry limit counter.
        // console.log(`Retry #${retryCount+1} for ${failedFundIndexes.length} batch`);
        retryCount++;

        //Loop through each index of failed fund and add it to the retryPromises array.
        failedFundIndexes.forEach((failedIndex) =>{
            const fundPromise = addFundDetails(batch[failedIndex]);
            retryPromises.push(wrap(fundPromise,failedIndex)); 
        })
        
        //Check if any batch failed again;
        const results = await Promise.all(retryPromises);

        //Clear the previous failed insertions and promises array to insert new entries.
        failedFundIndexes = [];
        retryPromises = [];

        //Loop through all the fullfilled promises.
        results.forEach((result)=>{

            //Check if promise rejected (fund failed.
            if(result.status === "failed"){
                
                //If fund has failed, add the failed fund index.
                failedFundIndexes.push(result.index);
                
                rejectedFunds.push({
                    index: result.index,
                    error: result.error?.message || String(result.error)
                })
                
            };

        })
    }


    //Log all the rejected funds.
    await logFailedFunds(rejectedFunds,batch);
}

export {retryFailedFunds};



