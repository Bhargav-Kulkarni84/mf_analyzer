import {createBatch} from './01.createBatch.js'

try{
    await createBatch();
}
catch(e){
    console.log("ERROR PROCESSSING RETURNS CALCULATION");
    console.log(`Reason + ${e.messsage}`);
}