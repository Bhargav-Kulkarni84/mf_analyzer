async function addProcessingStatus(client,fund_id,is_active){

    try{
        await client.query(`
        UPDATE fund_processing_status
            SET
                is_active = $1, 
                data_downloaded = TRUE,
                last_data_download = NOW()
            WHERE fund_id = $2`,
            [is_active,fund_id]);
        }
    catch(err){
        throw new Error(`fund_processing_status updatation failed for ${scheme_code}: ${err.message} \n`);
    }

}

export {addProcessingStatus};
