//This function does the batching, it picks 10 funds from the database and processes them.

import {pool} from './01.createPool.js'
import { processFunds } from "./05.processFunds.js";

async function createBatch(){

    //Select every entry from the funds table with id, scheme code.
    const result = await pool.query(`SELECT id,scheme_code,fund_name FROM funds`);
    const funds = result.rows;
    
    //Index to keep track of current batch;
    let index = 0;

    //Till we reach the end of all funds keep batching;

    //We cannot insert 37k+ funds in a single operation due to api rate limit,
    //We are dividing all the 37k funds in a batch of 10 funds.
    //We make api call for all 10 funds and add their respective details in the funds table.

    while(index < funds.length){

        await processFunds(funds,index);
        index += 10;

        // wait for 30 seconds before making another api calls
        await wait();

    }

}

//A function to create delay for 30 sec.
async function wait(){
    return new Promise (
        (resolve)=>{
            setTimeout(resolve,30000);
        }
    );
}


export {createBatch};
