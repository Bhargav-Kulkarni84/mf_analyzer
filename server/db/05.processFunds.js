//This function receives all the funds along with current batch index.
//It then divides the funds into the batch and add details to each fund.

import { addFundDetails } from "./04c.addFundDetails.js";
import fs from 'fs/promises'

//A wrapper function to store the status of promises.
const wrap = (promise,index)=>{
    return promise
    .then(
        ()=>{
            console.log(`Succesfully Inserted the ${index}-th fund`)
            return {status : "success", index};
        },
        (e)=>{
            console.log(`Failed Insertion of the ${index}-th fund`)
            return {status : "failed", index};
        }
    )
}

async function processFunds(funds,index){

    //Array to store all the failed insertions.
    let failedInsertionsIndex = [];
    let failedPromises = [];

    //Create the promises array to store the batch of 20 promises.
    let fundBatchPromises = [];

    //A batch of 10 funds;
    for(let i= index; i<index + 10 && i < funds.length; i++){

        //Add the processing of fund which is a collection of promises.
        //We will add at most 10 funds at a time.

        const onGoingFundPromise = addFundDetails(funds[i]);
        fundBatchPromises.push(wrap(onGoingFundPromise,i)); 

    }

    //Wait till all the promises gets full filled.
    let results = await Promise.all(fundBatchPromises);

    //Loop through all the response of all the promises and add the index of the funds for which the insertion failed.
    results.forEach((result)=>{
        if(result.status === "failed"){
            failedInsertionsIndex.push(result.index);
        }
    })

    //Keep retrying a fund until all the funds are resolved.
    const retryLimit = 3;
    let retryCount = 0;

    while(failedInsertionsIndex.length > 0 && retryCount<retryLimit){

        //Increment the retry limit counter.
        console.log("Retrying ....", failedInsertionsIndex);
        retryCount = retryCount+1;

        //Loop through each index of failed fund and add it to the failedPromises array
        failedInsertionsIndex.forEach((failedIndex) =>{
            const fundPromise = addFundDetails(funds[failedIndex]);
            failedPromises.push(wrap(fundPromise,failedIndex)); 
        })
        
        //Check if any funds failed again;
        results = await Promise.all(failedPromises);

        //Clear the failed insertions and failed promises array to insert new entries.
        failedInsertionsIndex = [];
        failedPromises = [];

        //Loop through all the promises and add the index of the funds for which the insertion failed.
        results.forEach((result)=>{
            if(result.status === "failed"){
                failedInsertionsIndex.push(result.index);
            }
        })
    }

    //Write the detailed of a fund that has failed more than retry limit 
    //fund's name, schemecode and error in a file to manually check the values for it.

    const failedFunds = [];
    failedInsertionsIndex.forEach((index) =>{

        const fundDetails = {
            id : funds[index].id,
            schemeCode : funds[index].scheme_code,
            name : funds[index].fund_name
        }

        failedFunds.push(fundDetails);

    })

    const jsonString = JSON.stringify(failedFunds);

    try {
        await fs.appendFile('./failedFunds.json', jsonString);
        console.log('File successfully written!');
    } 
    catch (err) {
        console.error('Error writing file:', err);
        }
   
}

export {processFunds};



