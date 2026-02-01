import express from "express";
import 'dotenv/config'
import getFund from './routes/getFund.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());  
app.use('/fund',getFund);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
