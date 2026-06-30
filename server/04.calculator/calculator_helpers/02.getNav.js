//Binary Search to find the next greater or eqaul element.
//smallest element greater than current nav
function getNav(nav_history,currDate,rollingYear){
        
    let rollingDate = new Date(currDate);
    rollingDate.setFullYear(rollingDate.getFullYear()-rollingYear)

    const targetTime = rollingDate.getTime();

    let start = 0;
    let end = nav_history.length-1;
    let ans = -1;

    while(start<=end){

        let mid = Math.floor((start + end) / 2);    

        if(nav_history[mid].time >= targetTime){
            ans = mid;
            end = mid-1;
        }
        else{
            start = mid+1;
        } 

    }

    if (ans === -1) return -1;

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (nav_history[ans].time - targetTime > sevenDays) return -1;

    return nav_history[ans].nav;
    
}


export {getNav};


