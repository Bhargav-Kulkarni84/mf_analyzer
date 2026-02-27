import { useLocation } from "react-router";
import GetRollingReturn from "./GetRollingReturn";

function FundCard() {
  const location = useLocation();
  const fund = location.state?.fund;

  if (!fund) return <div>No Fund Data</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ===== Fund Header ===== */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {fund.schemeName}
            </h1>
            <p className="text-gray-500 mt-2">
              Category: {fund.category || "Equity"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Net AUM</p>
              <p className="font-semibold text-lg">₹ 12,500 Cr</p>
            </div>

            <div>
              <p className="text-gray-500">Expense Ratio</p>
              <p className="font-semibold text-lg">1.05%</p>
            </div>

            <div>
              <p className="text-gray-500">Risk Level</p>
              <p className="font-semibold text-lg text-red-500">High</p>
            </div>

            <div>
              <p className="text-gray-500">Benchmark</p>
              <p className="font-semibold text-lg">NIFTY 50</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Key Ratios ===== */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Key Ratios</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <RatioCard title="Alpha" value="2.15%" />
          <RatioCard title="Beta" value="0.92" />
          <RatioCard title="Std Deviation" value="18.4%" />
          <RatioCard title="Sharpe Ratio" value="0.74" />
          <RatioCard title="Sortino Ratio" value="1.05" />
          <RatioCard title="Treynor Ratio" value="0.12" />
          <RatioCard title="Information Ratio" value="0.58" />
          <RatioCard title="Max Drawdown" value="-23%" />
        </div>
      </div>

      {/* ===== Rolling Returns ===== */}

        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Rolling Returns</h2>

        <div className="grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        xl:grid-cols-4 
                        gap-6">
            {/* {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((year) => ( */}
            {[5,10].map((year) => (
                <GetRollingReturn key={year} fund={fund} year={year}/>
            ))}
        </div>

        <div className="h-64 mt-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            Rolling Chart Placeholder
        </div>
        </div>

      {/* ===== Capture Ratios ===== */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Capture Ratios</h2>

        <div className="grid grid-cols-2 gap-6 text-center">
          <RatioCard title="Up Capture" value="112%" />
          <RatioCard title="Down Capture" value="87%" />
        </div>
      </div>
    </div>
  );
}

function RatioCard({ title, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default FundCard;


//Legacy Code
// import { Link, useLocation } from "react-router";

// function FundCard(){

//     //Since we are navigating through the link, we need to pass the prop using location.
//     const location = useLocation();
//     let fund = location.state.fund

//     return(

//         <div className="flex flex-col gap-6 m-4 p-4">
            
            
//             <div className="flex flex-row gap-6">
                
//                 {/* Fund Logo */}
//                 <div className="w-120 rounded-lg">
//                     <div className="text-center"> Fund Name {fund.schemeName} </div>
//                     <img className="border-2 rounded-xl" src="https://www.fisdom.com/wp-content/uploads/2021/04/shutterstock_458013994-scaled-1.jpg" alt="" />
//                 </div> 

//                 {/* Fund Info */}
//                 <div className="grid grid-cols-1 gap-8">
//                     <div className="">Objective : </div>
//                     <div className="">Category : </div>
//                     <div>Net Aum : </div>
//                     <div>TER : </div>
//                 </div>
//             </div>

//             {/* View Fund Analystics */}
//             <div className="flex flex-col gap-6 items-start ">

//                 <div className="flex flex-col gap-6 text-center">
//                     <div>View Rolling Returns</div>
//                     <div className="flex flex-row text-black gap-2">
//                         <Link to="/rolling" state={{fund:fund,year:1}} className="p-2 border-2">1 year</Link>
//                         <Link to="/rolling" state={{fund:fund,year:3}} className="p-2 border-2">3 years</Link>
//                         <Link to="/rolling" state={{fund:fund,year:5}} className="p-2 border-2">5 years</Link>
//                         <Link to="/rolling" state={{fund:fund,year:7}} className="p-2 border-2">7 years</Link>
//                         <Link to="/rolling" state={{fund:fund,year:10}} className="p-2 border-2">10 years</Link>
//                     </div>
//                 </div>

//                 <button className="text-blue-600">View Key Ratios</button>
//                 <button className="text-blue-600">View Capture Ratios</button>
//                 <button className="text-blue-600">View All</button>
//             </div>


//         </div>


//     )

// }


// export default FundCard;