import { getNav } from './calculator_helpers/02.getNav.js';
import {getCAGR} from './calculator_helpers/03.getCAGR.js';

//DB 
import {getFundId} from './calculator_helpers/00.getFundId.js'
import { getNavHistory } from './calculator_helpers/01.getNavHistory.js';

async function getRollingReturns(scheme_code,rollingYear){

    //Fetch the fund id cooresponding to the scheme code;
    const fundID = await getFundId(scheme_code);

    //Fetch the NAV history of requested fund from the database.

    let navHistory = await getNavHistory(fundID);
    // console.log("Nav Logs = "+navHistory.length);

    //Count the number of funds available for computing rolling returns.
    let fundCount = 0;

    //Variable to store the total, min and max CAGR.
    let rollingCAGR = 0;
    let maxCAGR = -Infinity;
    let minCAGR = Infinity;

    //Get rolling return for each value of fund.

    //Start from rolling year
    //If rolling year is 2 
    //Shift first 2*365 entries as there will not be any prior data available as our fund dates ares stored in asending order.
    //Subtracting 100 for missing dates.
    
    for(let i=0; i<navHistory.length; i++){
        
        const fund = navHistory[i];

        //Store the current fund nav.
        let currNav = fund.nav;

        //Get the current nav date of the fund.
        const navDate = fund.nav_date;
        const formattednavDate = new Date(navDate).toISOString().slice(0, 10);

        //Get the nav after rolling years.
        let result = await getNav(fundID,navDate,rollingYear);

        if(!result) continue;
        
        let newNav = result.nav;
        let newNavDate = result.date;
        const formattednewNavDate = new Date(navDate).toISOString().slice(0, 10);

        //If no valid nav exists don't consider the entry.
        if(Number.isNaN(newNav)) continue;

        //Compute the CAGR n years.
        let currCAGR = getCAGR(currNav,newNav,rollingYear); 
        
        //Store the max and min CAGR values of all funds.
        maxCAGR = Math.max(currCAGR,maxCAGR);
        minCAGR = Math.min(currCAGR,minCAGR);

        rollingCAGR = rollingCAGR + currCAGR;

        fundCount++;

        // console.log(`Rolling Returns between ${formattednavDate} & ${formattednewNavDate} = ${currCAGR.toFixed(2)}% `);
        
    };

    if (fundCount === 0) {
        return { avg: null, max: null, min: null };
    }

    const avgRollingCAGR = rollingCAGR/fundCount;

    // console.log(`${rollingYear} Year Avg Rolling Returns = ${avgRollingCAGR.toFixed(2)} %`);
    // console.log(`${rollingYear} Year Min Rolling Returns = ${minCAGR.toFixed(2)} %`);
    // console.log(`${rollingYear} Year Max Rolling Returns = ${maxCAGR.toFixed(2)} %`);

    const rollingReturnObj = {avg:avgRollingCAGR,max:maxCAGR,min:minCAGR,fundCount:fundCount};

    return rollingReturnObj;

}

export {getRollingReturns};


