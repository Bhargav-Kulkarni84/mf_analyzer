import AppError from "../03.errorHandlers/AppError.js";
import { computeRollingReturns } from "./03a.computeRollingReturns.js";

async function computeAllReturns(fund){
    
    try{
        await computeRollingReturns(fund);
    }
    catch(e){
        throw new AppError(`Error while computing returns for fund with scheme code ${fund.scheme_code}`,500,e);
    }

}

export {computeAllReturns};