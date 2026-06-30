//Returns the nav history of a fund provided its fund id

import {pool} from '../../01.db/01.createPool.js';
import AppError from '../../03.errorHandlers/AppError.js'

async function getNavHistory(fund_id){

    try{
        const result = await pool.query(`
                SELECT nav,nav_date 
                FROM nav_history 
                WHERE fund_id = $1 
                ORDER BY nav_date ASC ;`
        ,[fund_id]);
        let navHistory = result.rows;
        return navHistory;
    }

    catch(err){
        throw new AppError("Error occurred while fetching NAV data during rolling returns computation",500,err);
    }

}

export {getNavHistory};


 