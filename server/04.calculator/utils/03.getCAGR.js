function getCAGR(fv,pv,t){
    let CAGR =  Math.pow((fv/pv),(1/t)) - 1; 
    return Number(CAGR*100);
}

export {getCAGR};

