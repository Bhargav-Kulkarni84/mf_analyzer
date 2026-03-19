//Returns date in dd mm yyyy

function fetchDate(fundObj){
    
    let fundDate = fundObj.nav_date;
    // console.log(`Complete Date = ${fundDate}`)
    
    "------------------------------------------------------------------------------------------"
    //If the date is unit digit, i will store the single digit not the two digit.
    let date = JSON.parse(fundDate.slice(0,1)); 
    
    if(date === 0){
        date = JSON.parse(fundDate.slice(1,2)); 
    }else{
        date = JSON.parse(fundDate.slice(0,2)); 
    }

    // console.log(`Current Fund Date = ${date} `)
    "------------------------------------------------------------------------------------------"

    //Get the month if it is unit digit, store the single digit not the two digit.
    let month = JSON.parse(fundDate.slice(3,4));
    
    if(month === 0){
        month = JSON.parse(fundDate.slice(4,5)); 
    }else{
        month = JSON.parse(fundDate.slice(3,5)); 
    }
    // console.log(`Current Fund Month = ${month} `)
    "------------------------------------------------------------------------------------------"

    let year = JSON.parse(fundDate.slice(6));
    // console.log(`Current Fund Year = ${year} `)


    const dateObj = {date:date, month:month, year:year};
    return dateObj;
}

export {fetchDate};


