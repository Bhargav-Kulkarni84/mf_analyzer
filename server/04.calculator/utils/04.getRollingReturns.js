//Processing
import {getNav } from './02.getNav.js';
import {getCAGR} from './03.getCAGR.js';

//DB
import AppError from '../../03.errorHandlers/AppError.js';

async function getRollingReturns(fund_id,scheme_code,nav_history,rollingYear){

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
        if(oldNav === null) continue;
        
        //Compute the CAGR n years.
        let currCAGR = getCAGR(currNav,oldNav,rollingYear); 
        
        //Store the max and min CAGR values of all funds.
        maxCAGR = Math.max(currCAGR,maxCAGR);
        minCAGR = Math.min(currCAGR,minCAGR);

        rollingCAGR += currCAGR;

        dataPoints++;
        
    };

    if (dataPoints === 0) {
        // throw new AppError(
        //     `Insufficient NAV history for ${rollingYear}-year rolling returns.`,
        //     400
        // );
        return null;
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

export {getRollingReturns};


