import {pool} from './01.createPool.js'
import { batchUpdate } from "./05.batchUpdate.js";

async function addFundDetails(){

    //SELECT EVERY FUND FROM THE DATABASE.
    // const result = await pool.query(`SELECT id,scheme_code FROM funds`);
    
    //Select 200 fundS out of 37000 funds for demo
    const result = await pool.query(`SELECT id,scheme_code FROM funds LIMIT 200`);

    const funds = result.rows;
    
    //Index to keep track of current batch;
    let index = 0;

    //Till we reach the end of all funds keep batching;
    while(index < funds.length){

        await batchUpdate(funds,index);
        // index += 20;
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


export {addFundDetails};