//Using the connection pool created earlier, this file creates 4 tables inside the mfddb database.
import { pool } from "./01.createDB.js";

async function createTable(){

    try{
        await pool.query(`

                CREATE TABLE IF NOT EXISTS funds (
                    id SERIAL PRIMARY KEY,
                    scheme_code INTEGER UNIQUE NOT NULL,
                    fund_name TEXT NOT NULL,
                    category TEXT,
                    subcategory TEXT,
                    objective TEXT,
                    inception_date DATE,
                    fund_manager TEXT,
                    benchmark TEXT,
                    expense_ratio NUMERIC(5,2),
                    status BOOLEAN DEFAULT true,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS fund_metrics(
                    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,
                    metric TEXT NOT NULL,
                    year INTEGER,
                    value NUMERIC,
                    PRIMARY KEY (fund_id, metric, year)
                );

                CREATE INDEX IF NOT EXISTS idx_metric_lookup
                ON fund_metrics(metric,year);

                CREATE INDEX IF NOT EXISTS idx_fund_metrics_fundid
                ON fund_metrics(fund_id);

                CREATE TABLE nav_history(
                    id BIGSERIAL PRIMARY KEY,
                    fund_id INTEGER REFERENCES funds(id) ON DELETE CASCADE,
                    nav NUMERIC NOT NULL,
                    nav_date DATE NOT NULL
                );

                CREATE INDEX IF NOT EXISTS idx_nav_fund_date
                ON nav_history(fund_id, nav_date);

                
            `)

        console.log("Table created successfully");
    }

    catch(err){
        console.log(err);
    }

}

createTable();