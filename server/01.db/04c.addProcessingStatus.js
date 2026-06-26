async function addProcessingStatus(client,fund_id,scheme_code,is_active){

    try{
        await client.query(`

        INSERT INTO fund_processing_status
            (fund_id, is_active, data_downloaded, last_data_download)
        VALUES($1,$2,TRUE,NOW())

        ON CONFLICT (fund_id)

        DO UPDATE 
            SET
                is_active = $2, 
                data_downloaded = TRUE,
                retry_count = 0,
                last_data_download = NOW();`,
            [fund_id,is_active]);
        }

    catch(err){
        throw new Error(`fund_processing_status update failed for fund_id=${fund_id}, scheme_code=${scheme_code}: ${err.message}`);
    }

}

export {addProcessingStatus};
