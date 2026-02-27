// This Component renders all the funds that are in the database
import { useEffect, useState } from "react";
import axios from "axios";
import IndexCard from "../components/IndexCard";

export default function ShowFunds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fund");
        setFunds(response.data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Filter funds based on search
  const filteredFunds = funds.filter((fund) =>
    fund.schemeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ===== Page Header ===== */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Mutual Fund Explorer
        </h1>

        <input
          type="text"
          placeholder="Search fund..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-80 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ===== Loading State ===== */}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading funds...
        </div>
      ) : (
        <div className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        xl:grid-cols-4">
          {filteredFunds.map((fund, index) => (
            <IndexCard
              key={index}
              fund={fund}
              index={index + 1}
              link="https://www.fisdom.com/wp-content/uploads/2021/04/shutterstock_458013994-scaled-1.jpg"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredFunds.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No funds found.
        </div>
      )}
    </div>
  );
}


// //This Component renders all the funds that are in the database;
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import IndexCard from "./IndexCard";

// export default function ShowFunds(){

//     const [funds,setFunds] = useState([]);

//     //Get all the funds from the backend and render them.
//     useEffect(()=>{

//         const fetchFunds= async() =>{
//             const response = await axios.get('http://localhost:3000/fund');
//             console.log(response.data);
//             setFunds(response.data);
//         }

//         fetchFunds();

//     },[])

//     return(

//         <div className="grid grid-cols-5">

//             {
//                 //For each fund give a option to view details of that fund;
//                 funds.map((fund, index)=>(
//                     <IndexCard key={index} fund={fund} index={index+1} link={"https://www.fisdom.com/wp-content/uploads/2021/04/shutterstock_458013994-scaled-1.jpg"} />
//                 ))
//             }

//         </div>

//     )


// }