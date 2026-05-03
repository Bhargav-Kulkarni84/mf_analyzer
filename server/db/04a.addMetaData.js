//This function receives a meta data from fund it then 
//finds the fund in db and then adds the meta data to it.

import {pool} from '../db/01.createPool.js';

async function addMetaData(metaData){

    const {amcName,schemeType,schemeCategory,schemeCode,schemeName,isinGrowth,isinDivReinvestment} = metaData;

    //Get the fund based on scheme code and update the meta data.

    const query = `
            UPDATE funds 
            SET 
                amc_name = $1,
                scheme_type = $2,
                scheme_category = $3,
                isin_growth = $4,
                isin_div_reinvestment = $5
            WHERE scheme_code = $6
    `;
    
    await pool.query(query,[amcName,schemeType,schemeCategory,isinGrowth,isinDivReinvestment,schemeCode]);

    // console.log(`Added Meta Data for fund ${schemeName} with Scheme Code : ${schemeCode} Succesfully`);
    console.log(`Added metadata for ${schemeName}`);

}

export {addMetaData}