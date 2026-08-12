/*
    This function updates the data fetching details of the current fund.
    It will upsert the entries such as 
    is the current fund active
    based on the args passed.
*/

async function addProcessingStatus(client,fund_id,scheme_code,is_active,last_nav_date){

    try{
        await client.query(`

        INSERT INTO fund_processing_status
            (fund_id, is_active, last_nav_date, last_data_download, updated_at)
        VALUES($1,$2,$3,NOW(),NOW())

        ON CONFLICT (fund_id)

        DO UPDATE 
            SET
                retry_count = 0,
                last_error = NULL,
                is_active = $2, 
                last_nav_date = $3,
                last_data_download = NOW(),
                updated_at = NOW();`
                ,[fund_id,is_active,last_nav_date]);
        }

    catch(err){
        throw new Error(`fund_processing_status update failed for fund_id=${fund_id}, scheme_code=${scheme_code}: ${err.message}`);
    }

}

export {addProcessingStatus};
