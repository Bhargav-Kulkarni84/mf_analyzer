//This file computes the returns for all of the funds every month. 
//It selects the funds from data base which are
//a.Null (New Added Fund)
//b.Last returns computed date >= 30 days 

import { pool } from "../01.db/01.createPool";
import {computeReturns} from '../04.calculator/01.processRollingBatch.js'


const query = await pool.query(`SELECT fund_id FROM fund_processing_status WHERE NOW() - last_returns_calculated >= 30 ;`)


