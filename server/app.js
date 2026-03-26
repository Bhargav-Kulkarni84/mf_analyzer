import express from "express";
import 'dotenv/config'
import getFund from './routes/getFund.js'
import cors from 'cors';

const app = express();

// app.use(cors({
//   origin: '*',
// }));
app.use(cors());

app.use(express.json());

app.use('/fund', getFund);

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
  res.send("Server Is Accessible")
})

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});