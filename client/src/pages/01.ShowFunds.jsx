//Select All the funds from the database.

import axios from 'axios';
import {useState,useEffect} from 'react';

//PUBLIC URL
// const PUBLIC_URL = process.env.PUBLIC_URL;
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
console.log("API URL:", PUBLIC_URL);

import FundCard from '../components/03.FundCard.jsx'

export default function ShowFunds(){

    const [funds, setFunds] = useState([]);

    //Fetch all the funds at the start from the database.
    useEffect(()=>{

        const fetchFunds = async () => {

            try {
                const response = await axios.get(`${PUBLIC_URL}/fund`, {
                headers: {"ngrok-skip-browser-warning": "true"}
                });
                setFunds(response.data);
            } 
            catch (error) {
                console.error("Error fetching funds:", error);
            }
        }

        fetchFunds();

    },[]);

    return(

        <div className='flex flex-col gap-4 m-4 grid grid-cols-3'>

            {/* Iterate through Each fund and display its details */}
            {
                
                funds.map((fund,index)=>(
                    <FundCard key={index} fund={fund} index={index}/>
                ))

            }

        </div>

    )

}