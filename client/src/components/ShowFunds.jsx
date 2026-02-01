//This Component renders all the funds that are in the database;
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router"
import axios from 'axios';

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

        <div className="text-blue-600">

            {
            
            //For each fund give a option to view details of that fund;
            funds.map((fund)=>(
                
                <div key={fund.schemeCode}>

                <div className="text-purple-500">
                    {fund.schemeName}
                </div>

                <Link to = {`/fund/${fund.schemeCode}`} >
                    Go To Fund
                </Link>

                <Outlet/>
                
                </div>
                
            ))
            }

            

        </div>

    )


}