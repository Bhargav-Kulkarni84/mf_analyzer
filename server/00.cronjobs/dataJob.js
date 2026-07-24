import cron from 'node-cron';

// * * * * * * (sec | min | hr | day of month | month | day of week)

cron.schedule("0 0 2 */1 * *",function (){

    console.log("CRON JOB IS WORKING Every Day at 2 AM");

})