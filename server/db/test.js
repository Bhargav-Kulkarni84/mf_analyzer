import fs from 'fs/promises';

const fund_id = 1;

let navData = await fs.readFile('./routes/nav.txt');
navData = JSON.parse(navData);
navData = navData.data;


async function addNavData(fund_id, navData){

    const values = [];
    const params = [];

    let paramIndex = 1;

    for(const item of navData){

        const {nav,date} = item;

        const [day,month,year] = date.split("-");
        const parsedDate = `${year}-${month}-${day}`;

        values.push(`($${paramIndex},$${paramIndex+1},$${paramIndex+2})`);

        params.push(fund_id, nav, parsedDate);

        paramIndex += 3;
    }

    // console.log("Values\n"+values[0]);
    // console.log("Params\n"+params[0]+params[1]+params[2]);
    
    console.log("values.join(",")\n"+values.join(","));


}

await addNavData(fund_id,navData)

//    const query = `
//         INSERT INTO nav_history (fund_id,nav,nav_date)
//         VALUES ${values.join(",")}
//         ON CONFLICT (fund_id, nav_date) DO NOTHING
//     `;

//     await pool.query(query, params);

// values = 
// params = 1,156.44000,2026-02-04