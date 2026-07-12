import {wrap} from '../01.db/utils/03.wrap.js'
import {computeAllReturns} from './03.computeAllReturns.js';
import {retryFailedFunds} from './04.retryFailedFunds.js'
import AppError from '../03.errorHandlers/AppError.js';

async function processBatch(batchCount,batch){

    try{
        
        let failedFunds = [];
        
        //Push the funds to processing funds array.
        const fundPromises = batch.map((fund, index) =>
            wrap(computeAllReturns(fund), index)
        );

        //Process all fund promises.
        const result = await Promise.all(fundPromises);
        
        //Add all failed funds for preprocessing.
        result.forEach(promise =>{

            //If the fund encounters any error,
            //Push the fund with the caused error to the failed funds list.
            if(promise.status === "failed") {
                failedFunds.push(
                    {
                        fund : batch[promise.index],
                        index : promise.index, 
                        error : promise.error
                    }
                );
            }  
        });
        
        //Retry all the failed funds thrice.
        await retryFailedFunds(batch,failedFunds);

    }
    catch(e){
        //Log the error to logger
        throw new AppError(`Error processing the current batch -${batchCount}\n`,e.statusCode,e);
    }

}

export {processBatch};