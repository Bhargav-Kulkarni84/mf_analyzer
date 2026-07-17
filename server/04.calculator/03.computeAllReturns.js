import AppError from "../03.errorHandlers/AppError.js";
import { computeRollingReturns } from "./04a.RollingReturns/01.computeRollingReturns.js";

async function computeAllReturns(fund){

    await computeRollingReturns(fund);

}

export {computeAllReturns};