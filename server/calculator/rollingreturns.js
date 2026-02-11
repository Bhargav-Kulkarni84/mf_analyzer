import axios from 'axios';
import { fetchDate } from '../helper/fetchDate.js';
import { getNav } from '../helper/getNthYearNAV.js';
import {getCAGR} from '../helper/getCAGR.js'
import fs from 'fs/promises'

async function getRollingReturns(fundID,rollingYear){

    //Fetch the NAV of requested fund
    // const fetchFund= await axios.get(`https://api.mfapi.in/mf/${fundID}`);
    // let fundData = fetchFund.data.data;

    const fetchFund = await fs.readFile('./routes/nav.txt')
    let fundData = JSON.parse(fetchFund);
    fundData = fundData.data;

    //Count the number of funds available for computing rolling returns.
    let fundCount = 0;

    //Variable to store the total,min and max CAGR.
    let rollingCAGR = 0;
    let maxCAGR = Number.MIN_SAFE_INTEGER;
    let minCAGR = Number.MAX_SAFE_INTEGER;

 
    //Get rolling return for each value of fund.
    for(let i=0; i<fundData.length; i++){
        
        const fund = fundData[i];

        //Get the data,month,year of the current fund.
        const fundDate = fetchDate(fund);

        //Variable to store the current fund nav and corresponding rolling fund nav.
        let currNav = fund.nav;
        let newNav = getNav(fundData,fundDate,rollingYear);

        if(newNav === -1) break;

        //Compute the CAGR n years.
        let currCAGR = getCAGR(currNav,newNav,rollingYear); 
        
        //Store the max and min CAGR values of all funds.
        maxCAGR = Math.max(currCAGR,maxCAGR);
        minCAGR = Math.min(currCAGR,minCAGR);

        rollingCAGR = rollingCAGR + currCAGR;

        fundCount++;

        // console.log(`Rolling Returns between ${fundDate} & ${newFundDate} = ${fundReturn} `);
        
    };

    const avgRollingCAGR = rollingCAGR/fundCount;

    console.log(`${rollingYear} Year Avg Rolling Returns = ${avgRollingCAGR}`);
    console.log(`${rollingYear} Year Min Rolling Returns = ${minCAGR}`);
    console.log(`${rollingYear} Year Max Rolling Returns = ${maxCAGR}`);

    const rollingReturnObj = {avg:avgRollingCAGR,max:maxCAGR,min:minCAGR};

    return rollingReturnObj;

}

export {getRollingReturns};


