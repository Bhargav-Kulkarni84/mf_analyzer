import {Link} from 'react-router'

// const fund = {
//     fundId: "fund_001",
//     fundName: "Axis Bluechip Fund",

//     objective:
//       "To generate long-term capital appreciation by investing predominantly in equity and equity-related instruments of large-cap companies",

//     inception: "2010-01-01",

//     fundManager: "Shreyash Devalkar",

//     fundAumCr: 32000,
//     equityAumCr: 28500,

//     fundShareInCategoryAumPercent: 18.4,

//     benchmark: "NIFTY 100 TRI",
//     category: "Large Cap",

//     terPercent: 0.52
//   }

function FundCard({fund}){
    return (

        <div className="flex flex-col gap-4 p-4">
           
            <div className="flex flex-col gap-8 md:flex-row">     

                {/* Image + Name Container */}
                <div className="flex flex-col justify-center">

                    <div className="">{fund.schemeName}</div>

                    <div className="h-40 w-40 bg-yellow-100">
                        <img className="object-contain" src="https://play-lh.googleusercontent.com/9phraGHwV0K19RvELtSCPtZaYysI6xmi9qRORF8za1PN16OkSfVHT4Hdcg5D-UfJkifz" alt="" />
                    </div>
                    
                </div>
                
                {/* Primary Details */}
                <div className="flex flex-col gap-5">
                    <div>
                        <div>Objective : {fund.objective}</div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div>
                            <div>Inception : {fund.inception}</div>
                            <div>Benchmark : {fund.benchmark}</div>
                        </div>
                        <div>
                            <div>Type : {fund.category}</div>
                            <div>Aum : Rs. {fund.fundAumCr}cr</div>
                            <div>TER : {fund.terPercent}</div>
                        </div>
                    </div>
                </div>
            </div>

                {/* Details page direction */}
            <div className="flex flex-col gap-5 text-blue-500">

                <Link to="/keyratios" state ={{from:fund}}>View Key-Ratios {"->"} </Link>
                <Link to="/rollingretunrs/:id">View Rolling Returns {"->"}</Link>
                <Link to="">View Risk vs Returns {"->"}</Link>
                
            </div>
            
        </div>
    )
}

export default FundCard;