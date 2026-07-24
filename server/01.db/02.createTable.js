/*
    Using the connection pool created earlier, this file creates 4 tables inside the mfddb database.
*/

import { pool } from "./01.createPool.js";

import {fund_master,nav_history,fund_processing_status} from './queries/1.create_tables.js';

async function createTables(){

    try{   
        await pool.query(fund_master);
        console.log("fund_master Table created successfully");
        
        await pool.query(nav_history);
        console.log("nav_history Table created successfully");
        
        await pool.query(fund_processing_status);
        console.log("fund_processing_status Table created successfully");
    }
    catch(err){
        console.log(err);
    }

}

createTables();