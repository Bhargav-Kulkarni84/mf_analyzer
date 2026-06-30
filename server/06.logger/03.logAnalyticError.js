import fs from 'fs/promises';

async function logAnalyticError(scheme_code,message,error){

    const logEntry = {
        timestamp: new Date().toISOString(),
        fileName,
        line,
        message,
        error: error?.message,
        stack: error?.stack
    };

    await fs.appendFile('../06.logger/logs/03.analyticErrors.jsonl', JSON.stringify(logEntry) + "\n");

}

export {debugLog};