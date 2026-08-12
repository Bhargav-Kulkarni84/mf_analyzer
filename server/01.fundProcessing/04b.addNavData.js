import {getChunks} from './utils/01.getChunks.js'
import { insertNavChunk } from './utils/02.insertNavChunk.js';
import 'dotenv/config'

const CHUNK_SIZE = process.env.CHUNK_SIZE;

async function addNavData(client,id,navData,scheme_code){

    if(navData.length === 0) throw new Error(`No NAV data found for fund with scheme code - ${scheme_code}`);

    //Make the fund_id = id ==> From the fund_master table.
    //nav_history table has a foreign key named fund_id referenced to id from the fund_master.
    const fund_id = id;

    try{

        //1.Divide nav_history in a chunk of size 500.
        const nav_chunks = getChunks(navData,CHUNK_SIZE); 

        // console.log(`Inserting ${navData.length} NAV rows for fund ${fund_id}`);

        //2.Iterate through each chunk and create values for query.
        for(let i=0; i<nav_chunks.length; i++){
            // console.log(`Processing Fund ${fund_id}: chunk ${i+1}/${nav_chunks.length}`);

            //3.Process Individual Chunk.
            await insertNavChunk(client,nav_chunks[i],fund_id);
        }

        // console.log(`Inserted NAV rows for fund with fund id : ${fund_id} and scheme code : ${scheme_code}`);

    }
    catch(err){
        throw new Error(`NAV insertion failed for fund with scheme code : ${scheme_code} and error : ${err.message}`);
    }

}

export {addNavData};

