//This function receives all the funds along with current batch index.
//It then divides the funds into the batch and add details to each fund.

import fs from 'fs/promises'
import { addFundDetails } from "./04d.addFundDetails.js";

import { wait } from "./utils/02.delay.js"
import { wrap } from "./utils/03.wrap.js";
import { retryFailedFunds } from './05b.retryFailedFunds.js';

async function processFunds(funds){

    //1.Array to store all the failed insertions.
    let failedInsertionsIndexes = [];
    let failedPromises = [];

    //2.Create an array to store the promises returned from each of 10 funds within a batch.
    let fundBatchPromises = [];

    //3.Add details for individual fund of batch.
    for(let i=0; i<funds.length; i++){
        const onGoingFundPromise = addFundDetails(funds[i]);
        fundBatchPromises.push(wrap(onGoingFundPromise,i)); 
    }

    //4.Wait until all the promises gets fulfilled.
    let results = await Promise.all(fundBatchPromises);

    //5.Loop through all the responses of promises.
    //add the index of the funds for which the insertion failed.
    results.forEach((result)=>{
        if(result.status === "failed"){
            failedInsertionsIndexes.push(result.index);
        }
    })

    //Retry all the failed funds.
    await retryFailedFunds(failedInsertionsIndexes,funds);

   
}

export {processFunds};



/*
 //Keep retrying a fund until all the funds are resolved.
    const retryLimit = 3;
    let retryCount = 0;

    while(failedInsertionsIndexes.length > 0 && retryCount<retryLimit){

        //wait for 5 seconds before making an request;
        console.log("Retrying in ...")
        for(let i=5; i>0; i--){
            console.log("%d secs",i);
            await wait(1000);
        }

        //Increment the retry limit counter.
        console.log("\nRetrying Started", failedInsertionsIndexes);
        retryCount = retryCount+1;

        //Loop through each index of failed fund and add it to the failedPromises array
        failedInsertionsIndexes.forEach((failedIndex) =>{
            const fundPromise = addFundDetails(funds[failedIndex]);
            failedPromises.push(wrap(fundPromise,failedIndex)); 
        })
        
        //Check if any funds failed again;
        results = await Promise.all(failedPromises);

        //Clear the failed insertions and failed promises array to insert new entries.
        failedInsertionsIndexes = [];
        failedPromises = [];

        //Loop through all the promises and add the index of the funds for which the insertion failed.
        results.forEach((result)=>{
            if(result.status === "failed"){
                failedInsertionsIndexes.push(result.index);
            }
        })
    }

    //Write the detailed of a fund that has failed more than retry limit 
    //fund's name, schemecode and error in a file to manually check the values for it.

    const failedFunds = [];
    failedInsertionsIndexes.forEach((index) =>{

        const fundDetails = {
            id : funds[index].id,
            schemeCode : funds[index].scheme_code,
            name : funds[index].fund_name
        }

        failedFunds.push(fundDetails);

    })


    try {
        await fs.appendFile('./failedFunds.json', JSON.stringify(failedFunds) + "\n");
        console.log('File successfully written!');
    } 
    catch (err) {
        console.error('Error writing file:', err);
        }
   
*/