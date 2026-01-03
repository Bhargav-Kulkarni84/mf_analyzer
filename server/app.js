import express from 'express';
import 'dotenv/config';
import {data} from './getdata.js'
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/getData',(req,res)=>{
    res.json(data);
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT ${process.env.PORT}`);
})