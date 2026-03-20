import {fetchDate}  from "./fetchDate.js";

function getNav(fundData,fundDate,rollingYear){

    //Extract the required year,month and date for the given fund.
    let requiredYear = fundDate.year-rollingYear;
    let requiredMonth = fundDate.month;
    let requiredDate = fundDate.date;

    if(requiredYear<0) return NaN;

    //Iterate through the fund until we find the date equal to the required date.
    for(let i=0; i<fundData.length; i++){
        
        //Get the date,month,year of the required fund.
        const {date,month,year} = fetchDate(fundData[i]);   
        
        //Compare the current year and month with the required year and month.
        if(year === requiredYear && month === requiredMonth){

            //Check if we can get the exact date and use it's nav 
            // otherwise take the previous date;
            if(date === requiredDate || date< requiredDate ){
                
                //Return the nav of current fund.
                return fundData[i].nav;

                // console.log(`Current Fund Date : ${fund.date} \nNew Fund Date : ${date}-${month}-${year}`);
                // console.log(`Current Fund Nav: ${fund.nav} \nNew Fund Nav : ${fundData[i].nav}\n`);

            }

        }
        
    }


    //Return -1 when all the rolling returns corresponding to the fund are covered and we don't have previous year data.
    return NaN;

}

export {getNav};



