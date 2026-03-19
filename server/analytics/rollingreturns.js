import { fetchDate } from '../helper/01.fetchDate.js';
import { getNav } from '../helper/03.getNthYearNAV.js';
import {getCAGR} from '../helper/getCAGR.js';

//DB 
import {pool} from '../db/01.createPool.js';
import {nav_selection_query} from '../db_queries/01.nav_selection.js' 
import {getFundId} from '../helper/00.getFundId.js'

async function getRollingReturns(scheme_code,rollingYear){

    //Fetch the NAV of requested fund from the database.

    //Fetch the fund id cooresponding to the scheme code;
    const fundID = await getFundId(scheme_code);

    const navResult = await pool.query(nav_selection_query(),[fundID]);
    let fundData = navResult.rows;

    //Count the number of funds available for computing rolling returns.
    let fundCount = 0;

    //Variable to store the total,min and max CAGR.
    let rollingCAGR = 0;
    let maxCAGR = -Infinity;
    let minCAGR = Infinity;

    //Get rolling return for each value of fund.
    for(let i=0; i<fundData.length; i++){
        
        const fund = fundData[i];

        //Get the date,month,year of the current fund.
        const fundDate = fetchDate(fund);

        //Variable to store the current fund nav and corresponding rolling fund nav.
        let currNav = fund.nav;
        let newNav = getNav(fundData,fundDate,rollingYear);

        if(Number.isNaN(newNav)) continue;

        //Compute the CAGR n years.
        let currCAGR = getCAGR(currNav,newNav,rollingYear); 
        
        //Store the max and min CAGR values of all funds.
        maxCAGR = Math.max(currCAGR,maxCAGR);
        minCAGR = Math.min(currCAGR,minCAGR);

        rollingCAGR = rollingCAGR + currCAGR;

        fundCount++;

        // console.log(`Rolling Returns between ${fundDate} & ${newFundDate} = ${fundReturn} `);
        
    };

    if (fundCount === 0) {
        return { avg: null, max: null, min: null };
    }

    const avgRollingCAGR = rollingCAGR/fundCount;

    // console.log(`${rollingYear} Year Avg Rolling Returns = ${avgRollingCAGR}`);
    // console.log(`${rollingYear} Year Min Rolling Returns = ${minCAGR}`);
    // console.log(`${rollingYear} Year Max Rolling Returns = ${maxCAGR}`);

    const rollingReturnObj = {avg:avgRollingCAGR,max:maxCAGR,min:minCAGR,fundCount:fundCount};

    return rollingReturnObj;

}

export {getRollingReturns};


