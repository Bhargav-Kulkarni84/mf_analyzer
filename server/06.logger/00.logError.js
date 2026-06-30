import fs from "fs/promises";

async function logError(fund,error){

    const logEntry = {
        timestamp: new Date().toISOString(),
        fund_id: fund.id,
        scheme_code: fund.scheme_code,
        scheme_name: fund.scheme_name,
        error: error.message
    };

    await fs.appendFile(
        "./logs/errors.jsonl",
        JSON.stringify(logEntry) + "\n"
    );
}

export {logError};