function scheme_code_to_id_query(){

    const query = `

        SELECT id 
        FROM funds 
        WHERE scheme_code = $1

    `

    return query;
}

export {scheme_code_to_id_query};
    
// SELECT id 
// FROM funds 
// WHERE scheme_code = 100029;
    