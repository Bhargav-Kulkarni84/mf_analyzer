import { wrap } from "../01.db/utils/03.wrap.js";
import {logReturnsError} from '../06.logger/04.logReturnsError.js'
import { computeAllReturns } from "./03.computeAllReturns.js";

async function retryFailedFunds(batch,failedFunds){

    const retryLimit = 3;
    let retryCount = 0;
    
    while(retryCount<retryLimit && failedFunds.length !== 0){
        
        let retryFunds = []; 

        failedFunds.forEach(fundHolder => {
            retryFunds.push(wrap(computeAllReturns(fundHolder.fund),fundHolder.index));
        });

        const result = await Promise.all(retryFunds);

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
                        error:promise.error
                    }
                );
            } 
        })


    }

    //If the fund still fails after 3 retries log it to the logger file.
    await logReturnsError(failedFunds);

}

export {retryFailedFunds};