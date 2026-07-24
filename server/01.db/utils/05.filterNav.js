async function filterNav(client,fund_id,navData){

    const result = await client.query(`SELECT last_nav_date 
                        FROM fund_processing_status fps 
                        WHERE fps.fund_id = $1`
                        ,[fund_id]
                    );                    
    
    const lastNavDate = result.rows[0].last_nav_date;

    if(lastNavDate == null) return navData;
    
    const filteredNav = navData.filter(nav=>{
        const [d,m,y] = nav.date.split("-");
        const navDate = new Date(`${y}-${m}-${d}`);
        return navDate > lastNavDate;
    });

    return filteredNav;

}

export {filterNav}