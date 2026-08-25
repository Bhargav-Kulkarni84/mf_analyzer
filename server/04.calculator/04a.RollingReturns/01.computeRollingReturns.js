import { getRollingReturns } from "../utils/04.getRollingReturns.js";
import { getNavHistory } from "../utils/01.getNavHistory.js";
import AppError from "../../03.errorHandlers/AppError.js";
import { updateDB } from "./02.updateDB.js";

async function computeRollingReturns(fund){

    //Fetch the NAV history of requested fund from the database.
    let nav_history = await getNavHistory(fund.fund_id);

    if(nav_history.length === 0) throw new AppError(`No Nav Data Exists for fund with fund id ${fund.fund_id}`);

    //Process nav_history for binary search.
    //Add the time stamp for comparison.
    nav_history = nav_history.map(row =>(
        {
            nav: Number(row.nav),
            // "YYYY-MM-DD"    
            date: row.nav_date,
            //Processed for Binary Search.      
            time: new Date(row.nav_date).getTime() 
        }
    ))

    let startDate = new Date(nav_history[0].date).getFullYear();
    let endDate = new Date(nav_history[nav_history.length - 1].date).getFullYear();
    let maxRollingYear = endDate - startDate;

    //Compute Rolling returns for every available year.
    for(let rollingPeriod=1; rollingPeriod<=maxRollingYear; rollingPeriod++){

        //Get the rolling returns.
        const result = await getRollingReturns(fund.fund_id,fund.scheme_code,nav_history,rollingPeriod);
        
        if(result == null) continue;
        const {min,max,avg,dataPoints} = result;
        
        //Update the rolling returns summary table and fund processing status table.
        await updateDB(fund.fund_id,min,max,avg,rollingPeriod,dataPoints);
    
    }

    console.log(`Rolling Returns for fund with fund id = ${fund.fund_id} spanning over ${maxRollingYear} inserted Succesfully in db.`);

}

export {computeRollingReturns}