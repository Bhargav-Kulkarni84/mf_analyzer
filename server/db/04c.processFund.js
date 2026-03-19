import axios from "axios";

import { addMetaData } from "./04a.addMetaData.js";
import { addNavData } from "./04b.addNavData.js";
import { parseMetaData } from "../helper/parseMetaData.js";

async function processFunds(fund){
    
    try{

        //Convert the provided scheme code to interger.
        const scheme_code = parseInt(fund.scheme_code);

        //Get the meta data and nav of the current fund from mf api.
        const res = await axios.get(`https://api.mfapi.in/mf/${scheme_code}`);

        //Seperate the meta data and nav data from the fund.
        const rawMetaData = res.data.meta;
        const metaData = parseMetaData(rawMetaData);
        await addMetaData(metaData);

        const navData = res.data.data;
        await addNavData(fund.id, navData);
    }   
    catch(e){
        console.log("Failed fund:", fund.scheme_code);
    }
    

}

export {processFunds};