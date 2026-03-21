//Returns the nav history of a fund provided its fund id

import {pool} from '../db/01.createPool.js';

async function getNavHistory(fundID){

    const navResult = await pool.query(`
            SELECT nav, nav_date 
            FROM nav_history 
            WHERE fund_id = $1 
            ORDER BY nav_date DESC ;`
    ,[fundID]);

    let navHistory = navResult.rows;
    return navHistory;

}

export {getNavHistory};


 