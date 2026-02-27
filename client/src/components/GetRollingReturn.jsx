import { useState, useEffect } from "react";
import axios from "axios";

export default function GetRollingReturn({ fund, year }) {
  const fundID = fund.schemeCode;

  const [rollingReturnObj, setRollingReturnObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRollingReturns = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/fund/rolling?fundID=${fundID}&rollingYear=${year}`
        );
        setRollingReturnObj(response.data);
      } catch (error) {
        console.error("Error fetching rolling returns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRollingReturns();
  }, [fundID, year]);

  if (loading)
    return (
      <div className="bg-gray-50 rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </div>
    );

  if (!rollingReturnObj) return null;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 
                    rounded-2xl 
                    p-6 
                    shadow-md 
                    hover:shadow-xl 
                    transition 
                    duration-300">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {year} Year Rolling
      </h3>

      <div className="space-y-2 text-sm">

      <MetricRow label="Average" value={formatValue(rollingReturnObj.avg)} />
      <MetricRow label="Maximum" value={formatValue(rollingReturnObj.max)} />
      <MetricRow label="Minimum" value={formatValue(rollingReturnObj.min)} />
      {/* <MetricRow label="Fund Count" value={rollingReturnObj.fundCount} /> */}
      <div>{rollingReturnObj.fundCount}</div>


      </div>
    </div>
  );
}

function formatValue(val) {
  if (val === null || val === undefined || isNaN(val)) {
    return "N/A";
  }
  return `${Number(val).toFixed(2)}%`;
}


function MetricRow({ label, value }) {
  const isNegative = value.includes("-");

  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={`font-semibold ${isNegative ? "text-red-500" : "text-green-600"}`}>
        {value}
      </span>
    </div>
  );
}


// import { useState } from "react";
// import { useEffect } from "react";
// import axios from 'axios';

// //Since we are navigating through the link, we need to pass the prop using location.
// export default function GetRollingReturn({fund,year}){

//     const fundID = fund.schemeCode;

//     const [rollingReturnObj, setRollingReturnObj] = useState(null)

//     //Request the rolling returns corresponding to current fund for y years.

//     useEffect(()=>{

//         const fetchRollingReturns = async()=>{
//             const response = await axios.get(`http://localhost:3000/fund/rolling?fundID=${fundID}&rollingYear=${year}`);
//             const rollingObj = response.data;
//             setRollingReturnObj(rollingObj);
//         }

//         fetchRollingReturns();
//     },[])

//     if (!rollingReturnObj) return <div>Loading rolling returns...</div>;

//     return(

//         <div className="flex flex-col p-4 m-4 gap-4"> 
//             <div>Rolling Returns for {year} years</div>
//             <div className=" p-2">Average = {rollingReturnObj.avg.toFixed(2)}%</div>
//             <div className=" p-2">Maximum = {rollingReturnObj.max.toFixed(2)}%</div>
//             <div className=" p-2">Minimum = {rollingReturnObj.min.toFixed(2)}%</div>
//         </div>

//     )

// }