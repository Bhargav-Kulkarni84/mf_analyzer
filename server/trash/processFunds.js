//This will be single truth of fund, fund object will be created here.
import { fetchDate } from "./fetchDate.js";

//This function 
// 1. Filters all the outdated funds.
// 2. Adds the required fields to the fund
// eg. Rolling Returns, AUM, Title etc.

async function processFunds(funds){

    let processedFunds = [];

    for(let i=0; i<funds.length; i++){

        const fund = funds[i];
        let fundObj = {};

        // const fundDate = await axios.get(`https://api.mfapi.in/mf/${fund.schemeCode}`);
        const isActive = isOngoingFund(fund);

        //Checks if the current fund is still active or not.
        if(isActive){
            
            fundObj.schemeName = fund.schemeName;

            fundObj.schemeCode = fund.schemeCode;
            fundObj.fundID = fund.schemeCode;
            
            //A function to fetch fund preview details
            fundObj.fundName = fund.schemeName;
            fundObj.fundCategory = null;
            fundObj.fundSubCategory = null;

            fundObj.fundInceptionDate = null;
            fundObj.fundNetAum = null;
            fundObj.fundBenchmark = null;

            //Performance details will fetch specifically for fund.
            // fundObj.fundKeyRatios = {};
            // fundObj.fundRollingReturns = {};
            // fundObj.fundCaptureRatios = {};
            
            //After processing the fund, add it to processedFunds Obj.
            processedFunds.push(fundObj)

        }

    }

    return processedFunds;
}


//This function return whether the current fund is ongoing fund or not.
function isOngoingFund(fundDate){
        
    //Extract the current year from the fund.
    //If the current year and ongoing year is the same then add fund to the ongoing funds list.
    
    const lastFundYear = fetchDate(fundDate).year;
    const currYear = new Date().getFullYear();

    if(currYear === lastFundYear){
        return true;
    }

}


export {processFunds};