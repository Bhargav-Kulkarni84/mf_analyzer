import { wait } from "./02.delay.js";
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