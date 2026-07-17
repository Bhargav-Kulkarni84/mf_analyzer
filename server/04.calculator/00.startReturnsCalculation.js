import {createBatch} from './01.createBatch.js'

try{

    const startTime = new Date();

    console.log("Starting the returns calculations");
    await createBatch();
    console.log("Returns calculations successful");

    const endTime = new Date();

    const timeTaken = ((endTime-startTime)/(1000*60));
    console.log(`Time taken = ${timeTaken} mins`);

}
catch(e){
    console.log("ERROR PROCESSSING RETURNS CALCULATION");
    console.log(`Reason + ${e.messsage}`);
}