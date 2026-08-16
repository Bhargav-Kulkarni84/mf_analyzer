import { pool } from "../../00.db/01.createPool.js";
import AppError from "../../03.errorHandlers/AppError.js";

async function updateDB(fund_id,min,max,avg,rollingPeriod,dataPoints){

    //Create a seperate tcp connection to psql db. 
    const client = await pool.connect();

    try{

        //Wrap with transactions.
        await client.query("BEGIN");

        //1.Update rolling returns table.
        //Add the rolling returns to the rolling returns summary table. 
        //UPSERT
        await client.query(`
            
            INSERT INTO rolling_return_summary
            (
                fund_id,
                min_return,
                max_return,
                avg_return,
                rolling_period_years,
                observation_count
            )
            VALUES($1,$2,$3,$4,$5,$6)

            ON CONFLICT (fund_id,rolling_period_years)

            DO UPDATE 
            SET
                min_return = $2,
                max_return = $3,
                avg_return = $4,
                rolling_period_years = $5,
                observation_count = $6,
                updated_at = NOW()`, 
            [fund_id,min,max,avg,rollingPeriod,dataPoints]
        );

        //2.Update fund processing table for current fund.

        await client.query(`

            UPDATE fund_processing_status
            SET last_returns_calculated = NOW()
            WHERE fund_id = $1`,
            [fund_id]
        )

        await client.query("COMMIT");

    }
    catch(e){
        await client.query("ROLLBACK");
        console.log(`Error while performing db insertion of rolling returns for fund with fund id = ${fund_id}`);
        throw new AppError(e.message,500,e);
    }
    finally {
        await client.release();
    }

}

export {updateDB};