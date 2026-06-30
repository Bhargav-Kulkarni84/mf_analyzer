import { getRollingReturns } from "./01.rollingReturns";

try{
    //Get scheme code
    await getRollingReturns(scheme_code,rollig_year);
}
catch(err){
    await logAnalyticError(scheme_code,err.message,err);
}