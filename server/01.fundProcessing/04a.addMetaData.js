/*
    This function receives meta data as an argument.
    1.The function finds the fund from db
    2.Tries adding the meta data to it.
*/

async function addMetaData(client,metaData){

    try{
        const {fund_house,scheme_type,scheme_category,scheme_code,scheme_name,isin_growth,isin_div_reinvestment} = metaData;

        //Get the fund based on scheme code and update the meta data.
        const query = `
                UPDATE fund_master 
                SET 
                    fund_house = $1,
                    scheme_type = $2,
                    scheme_category = $3,
                    isin_growth = $4,
                    isin_div_reinvestment = $5
                WHERE scheme_code = $6`;
        
        const result = await client.query(query,[fund_house,scheme_type,scheme_category,isin_growth,isin_div_reinvestment,scheme_code]);

        if(result.rowCount === 0){
            throw new Error(`Fund with scheme code - ${scheme_code} not found when adding meta data.`);
        }

        // console.log(`Added Meta Data for fund ${schemeName} with Scheme Code : ${schemeCode} Succesfully`);
        // console.log(`Metadata Insertion Succesful for fund with scheme code - ${scheme_code}`);
    }

    catch(err){
        throw new Error(`Metadata insertion failed for ${metaData.scheme_code}: ${err.message} \n`);
    }

}

export {addMetaData}