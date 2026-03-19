import { processFunds } from "../db/04c.processFund.js";

async function batchUpdate(funds,index){

    //Create the promises array to store the batch of 20 promises.
    let fundBatchPromises = [];

    //A batch of 20 funds;
    for(let i= index; i<index + 20 && i < funds.length; i++){

        //Add the processing of fund which is a promise to the promises fund.
        //We will add at most 20 funds at a time.
        const onGoingFundPromise = processFunds(funds[i]);
        fundBatchPromises.push(onGoingFundPromise); 

    }

    await Promise.all(fundBatchPromises);

}

export {batchUpdate};