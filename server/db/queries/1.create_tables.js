// -- This tables stores the fund data (source of truth). --

// const benchmark_master = `CREATE TABLE IF NOT EXISTS benchmark_master(
//     id INTEGER SERIAL PRIMARY KEY,
//     benchmark_name text NOT NULL UNIQUE,
//     index_code text
// )`

const fund_master = `CREATE TABLE IF NOT EXISTS fund_master(
    id SERIAL PRIMARY KEY,
    scheme_code BIGINT NOT NULL UNIQUE,
    scheme_name TEXT NOT NULL,
    fund_house TEXT,
    scheme_type TEXT,
    scheme_category TEXT,
    isin_growth TEXT,
    isin_div_reinvestment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

)`

// const fund_profile = `CREATE TABLE IF NOT EXISTS fund_profile(

//         fund_id INTEGER PRIMARY KEY NOT NULL,
//         fund_name TEXT NOT NULL,
//         amc_name TEXT,
//         category TEXT,
//         subcategory TEXT,
//         objective TEXT,
//         inception_date DATE,
//         fund_manager TEXT,
//         benchmark_id INTEGER,
//         expense_ratio NUMERIC,
//         aum BIGINT,
//         last_verified_at TIMESTAMPTZ DEFAULT NOW(),

//         CONSTRAINT fund_fk
//         FOREIGN KEY (fund_id)
//         REFERENCES fund_master(id),
        
//         CONSTRAINT benchmark_fk
//         FOREIGN KEY (benchmark_id)
//         REFERENCES benchmark_master(id)

// )`


const nav_history = `CREATE TABLE IF NOT EXISTS nav_history(

    fund_id INTEGER NOT NULL,
    date DATE NOT NULL,
    nav NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT nav_fund_fk
        FOREIGN KEY (fund_id)
        REFERENCES fund_master(id),

    PRIMARY KEY (fund_id,date)

)`

const fund_processing_status = `CREATE TABLE IF NOT EXISTS fund_processing_status(

    fund_id INTEGER PRIMARY KEY, 
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    nav_downloaded BOOLEAN NOT NULL DEFAULT FALSE,
    last_nav_download TIMESTAMPTZ,
    last_error TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT status_fund_fk
        FOREIGN KEY (fund_id)
        REFERENCES fund_master(id)

)`



export {fund_master,nav_history,fund_processing_status}; 