/*
    This fund takes scheme code as an argument.
    It make an api request to mfapi using provided scheme code.
    
    If any error occurs it retries for 3 times, by exponentially backing off.
*/

import { wait } from "./00.wait.js";
import axios from "axios";

async function fetchFundData(scheme_code){
    for(let attempt=1; attempt<=3; attempt++){
        try{
            return await axios.get(`https://api.mfapi.in/mf/${scheme_code}`,{timeout:10000});;
        }
        catch(err){
            if(attempt === 3) throw err;
            await wait(2000 * attempt);
        }
    }
}

export {fetchFundData};