import { wrap } from "../01.fundProcessing/utils/03.wrap.js";
import AppError from "../03.errorHandlers/AppError.js";
import {logReturnsError} from '../06.logger/03.logReturnsError.js'
import { computeAllReturns } from "./03.computeAllReturns.js";
import { wait } from "../01.fundProcessing/utils/00.wait.js";

async function retryFailedFunds(batch,failedFunds){

    try{
        const retryLimit = 3;
        let retryCount = 0;
        
        while(retryCount<retryLimit && failedFunds.length !== 0){

            //Increment the retry limit counter.
            retryCount++;
            
            //Do linear backoff.
            await wait(5000 * retryCount);
            
            let failedFundPromises = []; 

            failedFunds.forEach(failedFund => {
                failedFundPromises.push(wrap(computeAllReturns(failedFund.fund),failedFund.index));
            });

            const result = await Promise.all(failedFundPromises);

            //Add all the failed funds again for re-processing.
            retryCount++;

            //Clear the previously failed funds result. 
            failedFunds = [];

            result.forEach((promise)=>{
                if(promise.status === "failed"){
                    failedFunds.push(
                        {
                            fund:batch[promise.index],
                            index :promise.index, 
                            error:promise.error,
                            statck:promise.error.stack
                        }
                    );
                } 
            })

        }

        //If the fund still fails after 3 retries log it to the logger file.
        if(failedFunds.length !==0) await logReturnsError(failedFunds);

    }

    catch(e){
        console.log("Fund failed during retrying...");
        throw new AppError(e.message,500,e);
    }

}

export {retryFailedFunds};