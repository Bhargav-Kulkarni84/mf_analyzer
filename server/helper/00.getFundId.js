//Returns fund id from the data base cooresponding to the funds scheme id.

import {pool} from '../db/01.createPool.js'
import {scheme_code_to_id_query} from '../db_queries/02.scheme_code_to_fund_id.js'

async function getFundId(scheme_code){
    
    const result = await pool.query(scheme_code_to_id_query(),[scheme_code]) ;

    console.log("Result : " +result.rows);

    return result.rows[0]?.id;

}

export {getFundId};