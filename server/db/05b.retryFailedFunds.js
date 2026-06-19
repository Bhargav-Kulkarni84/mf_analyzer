import { addFundDetails } from "./04d.addFundDetails.js";
import fs from 'fs/promises'
import { wrap } from "./utils/03.wrap.js";
import { wait } from "./utils/02.delay.js";
import { pool } from "./01.createPool.js";

const retryLimit = 3;

async function retryFailedFunds(failedInsertionsIndexes,funds){

    //Array to store all the failed insertions.
    let failedPromises = [];

    //Keep retrying until we cross retry threshold or all the funds are resolved.
    let retryCount = 0;

    //Array to store the error message.
    const failedFundsWithErrors = [];

    while(failedInsertionsIndexes.length > 0 && retryCount<retryLimit){

        //wait for 5 seconds before making an retry request;
        console.log("Retrying in ...")
        for(let i=5; i>0; i--){
            console.log("%d secs",i);
            await wait(1000);
        }

        //Increment the retry limit counter.
        console.log(`Retry #${retryCount+1} for ${failedInsertionsIndexes.length} funds`);
        retryCount++;

        //Loop through each index of failed fund and add it to the failedPromises array.
        failedInsertionsIndexes.forEach((failedIndex) =>{
            const fundPromise = addFundDetails(funds[failedIndex]);
            failedPromises.push(wrap(fundPromise,failedIndex)); 
        })
        
        //Check if any funds failed again;
        const results = await Promise.all(failedPromises);

        //Clear the previous failed insertions and promises array to insert new entries.
        failedInsertionsIndexes = [];
        failedPromises = [];


        //Loop through all the promises and add the index of the funds for which the insertion failed.
        results.forEach((result)=>{

            if(result.status === "failed"){
                
                failedInsertionsIndexes.push(result.index);
                
                failedFundsWithErrors.push({
                    index: result.index,
                    error: result.error?.message || String(result.error)
                })
                
            };

        })
    }

    //Write the details of a fund that has failed more than retry limit (3 times as of now).
    //fund's name, schemecode and error in a file to manually check the values for it.

    const failedFunds = [];

    for(let i=0; i<failedFundsWithErrors.length; i++){

        failedFundsWithErrors = [];

        const currFund = failedFundsWithErrors[i];
        const {index,error} = currFund;

        const fundDetails = {
            id : funds[index].id,
            schemeCode : funds[index].scheme_code,
            name : funds[index].scheme_name
        }

        failedFunds.push(fundDetails);

        //Add status as failed in db.
        const query = `UPDATE 
                        fund_processing_status
                        SET
                            last_error = $1,
                            retry_count = 3
                        WHERE fund_id = $2
                        `

        await pool.query(query,[error,funds[index].id]);



    }

    if(failedFunds.length === 0){
        console.log("No Fund Failed for current batch");
        return;
    }

    try {
        await fs.appendFile('./failedFunds.json', JSON.stringify(failedFunds) + "\n");
        console.log('File for failed successfully written!');
    } 
    catch (err) {
        console.error('Error writing to file failedFunds.json:', err);
    }
   
}

export {retryFailedFunds};



