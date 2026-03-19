import {pool} from '../db/01.createPool.js';

import { nav_selection_query } from './01.nav_selection.js';

const navResult = await pool.query(nav_selection_query(),[3]);

let fundData = navResult.rows;

console.log(fundData);