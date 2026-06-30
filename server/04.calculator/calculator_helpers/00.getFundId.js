//Returns fund id from the data base cooresponding to the funds scheme id.

import {pool} from '../../01.db/01.createPool.js'
import AppError from '../03.errorHandlers/AppError.js';

async function getFundId(scheme_code){

    try{
        const result = await pool.query(`
                SELECT id 
                FROM fund_master 
                WHERE scheme_code = $1`
            ,[scheme_code]) ;
    
        return result.rows[0]?.id;
    }
    catch(err){
        throw new AppError(`Error occured while fetching fund id during rolling returns computation`,500,err);
    }
 

}

export {getFundId};