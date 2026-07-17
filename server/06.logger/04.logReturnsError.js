import fs from 'fs/promises'

async function logReturnsError(failedFunds){

    await Promise.all(

        failedFunds.map(fund=>{

        const logEntry = {
            timestamp: new Date().toISOString(),
            fund_id: fund.fund_id,
            scheme_code: fund.scheme_code,
            error: fund.error.message,
            stack:fund.error.stack
        };

        return fs.appendFile(('./06.logger/logs/04.returnsCalculationError.jsonl'), JSON.stringify(logEntry) + "\n");

    })
)


}

export {logReturnsError};