import express from 'express';
import 'dotenv/config';
import {data} from './getdata.js'

const app = express();

app.get('/',(req,res)=>{
    res.json(data);
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT ${process.env.PORT}`);
})