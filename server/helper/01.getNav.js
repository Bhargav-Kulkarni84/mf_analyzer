import {pool} from '../db/01.createPool.js'

async function getNav(fundID,navDate,rollingYear){

    //Select nav value from nav history, 
    //where the fund id is given and
    //new nav date is greater than or eqaul to current date 

    const navResult = await pool.query(
        
        `SELECT nav, nav_date
         FROM nav_history
         WHERE fund_id = $1
         AND nav_date <= ($2 :: date - INTERVAL '1 year' * $3)
         ORDER BY nav_date DESC
         LIMIT 1;
        `

        ,[fundID,navDate,rollingYear]

    );

    // console.log(navResult.rows);

    if((navResult.rows).length == 0){
        return NaN;
    }

    // [ { nav: '16.15750' } ]
    return {
        nav : navResult.rows[0].nav,
        date : navResult.rows[0].nav_date
    }

}

export {getNav};

/*

    AND nav_date <= ($2 :: date - (INTERVAL '1 year') * $3)

    $2 :: date ==> type case second argument to DATE type.
    (INTERVAL '1 year') * $3 ==> Multiply the interval by a year to get the updated year.
    
    nav_date <= '2006-05-30' - INTERVAL '1 year'

*/

/*

    AND nav_date <= ($2 :: date - (($3 || 'years') :: interval))

    $2 :: date ==> type case second argument to DATE type.
    ($3 || 'years') :: interval ==> concatenate third argument and years then type cast it to INTERVAL ==> $3 years
    
    nav_date <= '2006-05-30' - INTERVAL '1 year'

*/


