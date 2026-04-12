import {Pool} from 'pg';
import 'dotenv/config';

//This file opens pool of TCP connections from db to postgres server.

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export {pool};