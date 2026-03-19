import {pool} from './01.createPool.js';

async function addNavData(fund_id, navData){

    //Batch Insertion;
    
    //Iterate through the whole Nav History and store it in the nav_history table.

    let valueString = [];
    let values = [];
    
    let index = 1;

    for(let i=0; i<navData.length; i++){
        
        const navObj = navData[i];

        const nav = navObj.nav;
        const date = navObj.date;

        //Add the current 
        
        //fund id
        values.push(fund_id);
        
        //nav
        values.push(nav);
        
        //date (convert to psql format).
        const [day,month,year] = date.split("-");
        const nav_date = `${year}-${month}-${day}`;
        values.push(nav_date);

        // Create a value string for required values : VALUES ($1,$2,$3);
        const valString = `($${index},$${index+1},$${index+2})` 

        //Store the value string for 3 values    
        //FundID Nav NavDate
        valueString.push(valString);

        //We will increment index by 3 as we will be storing 3 values (FundID Nav NavDate).
        //for next value our index should start from 4,5,6
        index += 3;

    }

    //VALUES ($1,$2,$3);
    //Join [($1,$2,$3),($4,$5,$6),($7,$8,$9)] by ",";
    //($1,$2,$3),($4,$5,$6),($7,$8,$9);

    const allRowValues = valueString.join(","); 

    //Batch Insertion (All Rows in single query);
    const query = `INSERT INTO nav_history
        (fund_id, nav, nav_date)
        VALUES ${allRowValues}
        ON CONFLICT (fund_id, nav_date) DO NOTHING;
    `

    await pool.query(query,values);

}

export {addNavData};


/*
    Sequential Insertion Very Slow.

    for(let i=0; i<navData.length; i++){

        //Get the date and nav for the fund
        const {nav,date} = navData[i];

        // converting from dd-mm-yyyy to yyyy-mm-dd
        const [day,month,year] = date.split("-");
        const parsedDate =  `${year}-${month}-${day}`;

        const query = `
            INSERT INTO nav_history (fund_id, nav, nav_date)
            VALUES 
            ($1,$2,$3)
            ON CONFLICT (fund_id, nav_date) DO NOTHING;
        `;

        await pool.query(query,[fund_id,nav,parsedDate]);
    
    }
*/

