import {getNav } from './calculator_helpers/02.getNav.js';
import {getCAGR} from './calculator_helpers/03.getCAGR.js';

//DB 
import {getFundId} from './calculator_helpers/00.getFundId.js'
import { getNavHistory } from './calculator_helpers/01.getNavHistory.js';
import AppError from '../03.errorHandlers/AppError.js';

async function getRollingReturns(scheme_code,rollingYear){

    try{
        //Fetch the fund id cooresponding to the scheme code;
        const fund_id = await getFundId(scheme_code);

        //Fetch the NAV history of requested fund from the database.
        let nav_history = await getNavHistory(fund_id);

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

        //Count the number of data points available for computing rolling returns.
        let dataPoints = 0;

        //Variable to store the total, min and max CAGR.
        let rollingCAGR = 0;
        let maxCAGR = -Infinity;
        let minCAGR = Infinity;

        //Get rolling return for each value of fund.
        for(const navEntry of nav_history){
            
            //For current fund store the current nav and date.
           const { nav: currNav, date: currNavDate } = navEntry;
            
            //Get the nav after rolling years.
            let oldNav = getNav(nav_history,currNavDate,rollingYear);
            
            //If no nav exist corresponding to current date, continue.
            if(oldNav === -1) continue;
            
            //Compute the CAGR n years.
            let currCAGR = getCAGR(currNav,oldNav,rollingYear); 
            
            //Store the max and min CAGR values of all funds.
            maxCAGR = Math.max(currCAGR,maxCAGR);
            minCAGR = Math.min(currCAGR,minCAGR);

            rollingCAGR += currCAGR;

            dataPoints++;
            
        };

        if (dataPoints === 0) {
            throw new AppError(
                `Insufficient NAV history for ${rollingYear}-year rolling returns.`,
                400
            );
        }

        const avgRollingCAGR = rollingCAGR/dataPoints;
        
        //Return rolling return details.
        return {
            avg:avgRollingCAGR,
            max:maxCAGR,
            min:minCAGR,
            dataPoints:dataPoints
        };

    }

    catch(err){
        throw new AppError(`Error computing rolling returns`,500,err);
    } 
    

}

export {getRollingReturns};


