/*
    This function receives a fund as an argument 
    it then adds META DATA and NAV DATA for a given batch of funds using the respective functions.
*/

import axios from "axios";

import {pool} from "./01.createPool.js";
import {addMetaData} from "./04a.addMetaData.js";
import {addNavData} from "./04b.addNavData.js";
import {addProcessingStatus} from "./04c.addProcessingStatus.js";
import {logError} from "../logger/00.logError.js"
import {fetchFundData} from "./utils/04.fetchFundData.js"

async function addFundDetails(fund){
    
    //Create a seperate tcp connection to psql db. 
    const client = await pool.connect();

    let transactionStarted = false;

    try{

        //Convert the provided scheme code to interger.
        const scheme_code = parseInt(fund.scheme_code);

        //Get the meta data and nav of the current fund from mf api.
        const res = await fetchFundData(scheme_code);
        
        //Check if the api is sending correct data.
        if(!res.data?.meta) throw new Error("Missing metadata");

        if(!res.data?.data) throw new Error("Missing NAV history");

        //Seperate the meta data and nav data from the fund.
        const metaData = res.data.meta;
        const navData = res.data.data;

        //Wrap with transactions.
        await client.query("BEGIN");

        transactionStarted = true;

        //Add the Nav and Meta data of current fund.
        await addMetaData(client,metaData);
        await addNavData(client,fund.id, navData,scheme_code);

        const {date} = navData[0] ;
        const [day,month,year] = date.split("-");

        const latestNavDate = new Date(`${year}-${month}-${day}`);
        const daysOld =(Date.now() - latestNavDate.getTime()) / (1000 * 60 * 60 * 24);
        const isActive = daysOld < 30;
        
        //The fund is active only if current nav data - current data < 1 month. 
        await addProcessingStatus(client,fund.id,scheme_code,isActive);

        await client.query("COMMIT");
    }   
    
    catch(e){

        //Add the Error to Error Log File.
        try{
            await logError(fund,e);
        }
        catch(logErr){
            console.error(
                "Error logging failed",
                logErr.message
            );
        }

        //Roll back on errors.
        if(transactionStarted){
            await client.query("ROLLBACK");
        }

        //Throw the error, to reach to the parent error handler.
        throw(e);
    }
    
    finally {
        //Close the db transaction connection.
        client.release();
    }
    
}

export {addFundDetails};