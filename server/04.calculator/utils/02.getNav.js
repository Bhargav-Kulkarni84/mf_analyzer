//Binary Search to Find the LAST date <= targetTime
function getNav(nav_history,currDate,rollingYear){
    
    //Move rolling years back from the current date.
    let rollingDate = new Date(currDate);
    rollingDate.setFullYear(rollingDate.getFullYear()-rollingYear)

    //Convert the rolling date to time stamp.
    const targetTime = rollingDate.getTime();

    let start = 0;
    let end = nav_history.length-1;
    let ans = -1;

    while(start<=end){

        let mid = Math.floor((start + end) / 2);    

        if(nav_history[mid].time <= targetTime){
            ans = mid;
            start = mid + 1;
        }
        else{
            end = mid - 1;
        } 

    }

    if (ans === -1) return null;

    //Convert 7 days to timestamps
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (targetTime - nav_history[ans].time > sevenDays) return null;

    return nav_history[ans].nav;
    
}


export {getNav};


