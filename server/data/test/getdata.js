import fs from "fs";
import axios from "axios";

let fund = await axios.get('https://api.mfapi.in/mf');

fund = JSON.stringify(fund.data);

async function writeData(){
    fs.writeFile("sample.txt",fund,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("All funds added succesfully");
        }
    });
}

try{
    await writeData();
    console.log("Insertion Success");
}
catch(e){
    console.log(e);
}