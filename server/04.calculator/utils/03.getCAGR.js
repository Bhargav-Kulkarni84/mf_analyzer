function getCAGR(fv,pv,t){

    if (!Number.isFinite(fv) || !Number.isFinite(pv) || fv <= 0 || pv <= 0 || t <= 0) return null;

    let CAGR =  Math.pow((fv/pv),(1/t)) - 1;

    if (!Number.isFinite(CAGR)) return null;

    return CAGR*100;
}

export {getCAGR};

