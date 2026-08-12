/* Scheduler call the data and return jobs. */
import cron from 'node-cron'

import {startBatchProcessing} from '../01.db/07.startBatchProcessing.js'
import {startReturnsCalculation} from '../04.calculator/00.startReturnsCalculation.js'

let isRunning = false;

// * * * * * * (sec | min | hr | day of month | month | day of week)
cron.schedule("0 0 22 * * *", async ()=>{

    console.log("CRON JOB Started Every Day at 2 AM");

    if (isRunning) {
        console.log("Previous pipeline still running. Skipping...");
        return;
    }

    try{

        isRunning = true;

        console.log("Starting Fund Processing");
        await startBatchProcessing();
        console.log("Fund Processing Completed");
        
        console.log("Starting Returns Computation");
        await startReturnsCalculation();
        console.log("Returns Computation Completed");

    }
    

    catch(e){

        console.log(e.message);

    }
    
    finally{

        isRunning = false;

    }

})
