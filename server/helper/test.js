// import { getNav } from "./01.getNav.js";
// // async function getNav(fundID,navDate,rollingYear)

// const nav = await getNav(3,'2008-05-30',2);

// console.log(nav);

import { getRollingReturns } from "../calculator/01.rollingReturns.js";

const result = await getRollingReturns(100029,2);

console.log(result);
