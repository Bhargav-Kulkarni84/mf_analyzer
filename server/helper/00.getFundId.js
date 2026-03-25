//Returns fund id from the data base cooresponding to the funds scheme id.

import {pool} from '../db/01.createPool.js'

async function getFundId(scheme_code){
 
    const result = await pool.query(`
            SELECT id 
            FROM funds 
            WHERE scheme_code = $1`
        ,[scheme_code]) ;

    // console.log("Fund ID = "+result.rows[0]?.id +"\nfor scheme_code = "+scheme_code);

    return result.rows[0]?.id;

}

export {getFundId};