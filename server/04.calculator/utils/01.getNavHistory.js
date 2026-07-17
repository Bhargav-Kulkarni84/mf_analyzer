//Returns the nav history of a fund provided its fund id

import {pool} from '../../01.db/01.createPool.js';
import AppError from '../../03.errorHandlers/AppError.js'

async function getNavHistory(fund_id){

    const result = await pool.query(`
            SELECT nav,nav_date 
            FROM nav_history 
            WHERE fund_id = $1 
            ORDER BY nav_date ASC ;`
    ,[fund_id]);
    
    return result.rows;

}

export {getNavHistory};


 