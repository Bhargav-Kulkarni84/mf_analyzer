function parseMetaData(metaData){

    let amcName = metaData["fund_house"];
    let schemeType = metaData["scheme_type"];
    let schemeCategory = metaData["scheme_category"];
    let schemeCode = metaData["scheme_code"];  
    let schemeName = metaData["scheme_name"];
    let isinGrowth = metaData["isin_growth"];
    let isinDivReinvestment = metaData["isin_div_reinvestment"];

    let parsedData = {amcName,schemeType,schemeCategory,schemeCode,schemeName,isinGrowth,isinDivReinvestment};

    return parsedData;

}

export {parseMetaData};