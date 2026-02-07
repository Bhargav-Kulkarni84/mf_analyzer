import axios from 'axios'
import { useState, useEffect } from 'react';
import FundCard from '../components/FundCard';

//Whenever this component mounts, i will request all the funds from the backend and display here.

export default function ViewFund(){

    const [funds,setFunds] = useState([]);

        //async get request to backend route and fetch all funds and set them in funds as a state.
        useEffect(() =>{

            const fetchFunds = async () =>{ 
                const res = await axios.get('http://localhost:3000/fund/show')
                setFunds(res.data);
            }

            fetchFunds();

        },[])

    return(
        
        //Itertate through the whole funds object array, 
        //Send the fund to the Fund Card Component which will 
        //display each fund with its name and Schemecode.

        <div>
            {
                funds.map((fund)=>{     
                    // return <li>Fund Name :{fund.schemeName}</li>
                    return <FundCard fund = {fund}/>
                })
            }
        </div>


    )   
}