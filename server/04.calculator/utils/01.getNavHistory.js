//Returns the nav history of a fund provided its fund id

import {pool} from '../../00.db/01.createPool.js';
import AppError from '../../03.errorHandlers/AppError.js'

async function getNavHistory(fund_id){

    const result = await pool.query(`
            SELECT nav,nav_date 
            FROM nav_history 
            WHERE fund_id = $1 
            ORDER BY nav_date ASC ;`
    ,[fund_id]);
    
    const nav_history = result.rows;

    //Validate the nav history (Remove all negative and zero nav entries);
    const validNavHistory = nav_history
                            .map(row => ({
                                nav : Number(row.nav),
                                date : row.nav_date,
                            }))
                            .filter(row => Number.isFinite(row.nav) && row.nav > 0);

    return validNavHistory;

}

export {getNavHistory};


 