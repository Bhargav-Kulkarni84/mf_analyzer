//This Component renders all the funds that are in the database;
import { useEffect, useState } from "react";
import axios from 'axios';
import IndexCard from "./IndexCard";

export default function ShowFunds(){

    const [funds,setFunds] = useState([]);

    //Get all the funds from the backend and render them.
    useEffect(()=>{

        const fetchFunds= async() =>{
            const response = await axios.get('http://localhost:3000/fund');
            setFunds(response.data.fund);
        }

        fetchFunds();

    },[])

    return(

        <div className="grid grid-cols-3">

            {
            
            //For each fund give a option to view details of that fund;
            funds.map((fund, index)=>(
                <IndexCard key={index} fund={fund} index={index+1} link={"https://www.fisdom.com/wp-content/uploads/2021/04/shutterstock_458013994-scaled-1.jpg"} />
            ))
            }

            

        </div>

    )


}