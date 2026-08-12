/*
    This file takes fund_id and chunk size as input.
    It adds that chunk in the fund with provided fund id.

*/

async function insertNavChunk(client,chunk,fund_id){

    //contains fund_id, date, nav
    const vals = [];

    //query index
    let queryIndex = 1;

    //value placeholder = ($1,$2,$3)
    const valsPlaceholder = [];

    //1.Process Chunk.
    chunk.forEach(navRecord =>{

        //a.Extract nav and date
        const {nav,date} = navRecord;
        const [day, month, year] = date.split("-");
        
        //b.Convert date in psql format.
        const nav_date = `${year}-${month}-${day}`;
        
        //c.Push values in the values array.
        vals.push(fund_id,Number(nav),nav_date);
        
        //d.Create a current placeholder representing the query index for current chunk and add it to placeholder array..  
        const currPlaceholder = `($${queryIndex}, $${queryIndex+1}, $${queryIndex+2})`;
        valsPlaceholder.push(currPlaceholder);

        //e.Update the query index by 3
        queryIndex+=3;

    })

    //2.Perform Insertion.

    // a. Join all placeholder by a comma creating a value string.
            //valsPlaceholder = [($1,$2,$3),($4,$5,$6),($7,$8,$9)]  
            // Join by ","; (Array --> String).
            //resultingstring = "($1,$2,$3),($4,$5,$6),($7,$8,$9)";
    
    const placeholderString = valsPlaceholder.join(","); 

    //b.Perform Query.
    const query = `INSERT INTO nav_history
        (fund_id, nav, nav_date)
        VALUES ${placeholderString}
        ON CONFLICT (fund_id, nav_date) DO NOTHING;`
    
    await client.query(query,vals);

}            

export {insertNavChunk};