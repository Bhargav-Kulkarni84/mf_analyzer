import fs from 'fs/promises';

async function debugLog(fileName,line,message,error){

    const logEntry = {
        timestamp: new Date().toISOString(),
        fileName,
        line,
        message,
        error: error?.message,
        stack: error?.stack
    };

    await fs.appendFile('./logs/02.debug.jsonl', JSON.stringify(logEntry) + "\n");

}

export {debugLog};