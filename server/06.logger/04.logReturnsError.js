import fs from 'fs/promises'

async function logReturnsError(failedFunds){

    failedFunds.forEach(async(fund)=>{

        const logEntry = {
            timestamp: new Date().toISOString(),
            fund_id: fund.fund_id,
            scheme_code: fund.scheme_code,
            error: fund.error.message
        };

        await fs.appendFile(('../logs/04.returnCalculationError.jsonl'), JSON.stringify(logEntry) + "\n");
    })


}

export {logReturnsError};