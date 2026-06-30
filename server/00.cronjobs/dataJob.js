//Add the recent nav data to the nav_history.
//Update meta data.

import {pool} from '../01.db/01.createPool.js'
import { fetchFundData } from '../01.db/utils/04.fetchFundData.js';

//Select every active fund from db.
const result = await pool.query(`
        SELECT id,scheme_code FROM fund_master fm
        JOIN fund_processing_status fps 
        ON fm.id = fps.fund_id
        WHERE is_active = FALSE
    
    `);

//Make an api request to fetch nav and meta data of all the funds.


const funds = result.rows;

console.log(funds);
