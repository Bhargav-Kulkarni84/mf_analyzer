function getCAGR(fv,pv,t){
    let CAGR =  Math.pow((fv/pv),(1/t)) - 1; 
    return CAGR*100;
}

export {getCAGR};
