import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router";

//Since we are navigating through the link, we need to pass the prop using location.
export default function GetRollingReturn(){

    const location = useLocation();
    let {fund,year} = location.state;

    const fundID = fund.schemeCode;

    const [rollingReturnObj, setRollingReturnObj] = useState(null)

    //Request the rolling returns corresponding to current fund for y years.

    useEffect(()=>{

        const fetchRollingReturns = async()=>{
            const response = await axios.get(`http://localhost:3000/fund/rolling?fundID=${fundID}&rollingYear=${year}`);
            const rollingObj = response.data;
            setRollingReturnObj(rollingObj);
        }

        fetchRollingReturns();
    },[])

    if (!rollingReturnObj) return <div>Loading rolling returns...</div>;

    return(

        <div className="flex flex-col p-4 m-4 gap-4"> 
            <div>Rolling Returns for {year} years</div>
            <div className=" p-2">Average = {rollingReturnObj.avg.toFixed(2)}%</div>
            <div className=" p-2">Maximum = {rollingReturnObj.max.toFixed(2)}%</div>
            <div className=" p-2">Minimum = {rollingReturnObj.min.toFixed(2)}%</div>
        </div>

    )

}