//Select nav, nav-date from nav history 

function nav_selection_query(){

    const query = `
        SELECT nav, nav_date 
        FROM nav_history
        WHERE fund_id = $1
        ORDER BY nav_date DESC
        ;
    `
}

export {nav_selection_query};