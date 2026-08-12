/*
    Write the details of a fund that has failed more than retry limit (3 times as of now).
    fund's name, schemecode and error in a file to manually check the values for it.
*/

import {pool} from '../00.db/01.createPool.js'

async function logFailedFunds(rejectedFunds,batch){

    if(rejectedFunds.length === 0) return;

    //An array to store the failed fund with
    const failedFunds = [];

    for(const rejectedFund of rejectedFunds){

        const {index,error} = rejectedFund;

        const fundDetails = {
            fundId : batch[index].id,
            schemeCode : batch[index].scheme_code,
            error : error
        }

        //Add the fund to final failed fund array.
        failedFunds.push(fundDetails);

        //Add status as failed in db.
        const query = `UPDATE 
                        fund_processing_status
                        SET
                            last_error = $1,
                            retry_count = retry_count + 3
                        WHERE fund_id = $2
                        `

        await pool.query(query,[error,batch[index].id]);

    }

    try {
        await fs.appendFile('./00.failedFunds.jsonl', failedFunds.map(fund => JSON.stringify(fund)).join('\n') + '\n');
        console.log('File for failed successfully written!');
    } 
    catch (err) {
        console.error('Error writing to file 00.failedFunds.jsonl:', err);
    }

}

export {logFailedFunds};
