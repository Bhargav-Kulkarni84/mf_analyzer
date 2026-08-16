import fs from 'fs/promises'

async function logReturnsError(failedFunds){

    await Promise.all(

        failedFunds.map(result=>{

            const logEntry = {
                timestamp: new Date().toISOString(),
                fund_id: result.fund_id,
                scheme_code: result.fund.scheme_code,
                error: result.error.message,
                stack:result.error.stack
            };

            return fs.appendFile(('./06.logger/logs/04.returnsCalculationError.jsonl'), JSON.stringify(logEntry) + "\n");

        })
    )   

}

export {logReturnsError};