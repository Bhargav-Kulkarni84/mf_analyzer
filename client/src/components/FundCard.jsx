import { Link, useLocation } from "react-router";

function FundCard(){

    //Since we are navigating through the link, we need to pass the prop using location.
    const location = useLocation();
    let fund = location.state.fund

    return(

        <div className="flex flex-col gap-6 m-4 p-4">
            
            
            <div className="flex flex-row gap-6">
                
                {/* Fund Logo */}
                <div className="w-120 rounded-lg">
                    <div className="text-center"> Fund Name {fund.schemeName} </div>
                    <img className="border-2 rounded-xl" src="https://www.fisdom.com/wp-content/uploads/2021/04/shutterstock_458013994-scaled-1.jpg" alt="" />
                </div> 

                {/* Fund Info */}
                <div className="grid grid-cols-1 gap-8">
                    <div className="">Objective : </div>
                    <div className="">Category : </div>
                    <div>Net Aum : </div>
                    <div>TER : </div>
                </div>
            </div>

            {/* View Fund Analystics */}
            <div className="flex flex-col gap-6 items-start ">

                <div className="flex flex-col gap-6 text-center">
                    <div>View Rolling Returns</div>
                    <div className="flex flex-row text-black gap-2">
                        <Link to="/rolling" state={{fund:fund,year:1}} className="p-2 border-2">1 year</Link>
                        <Link to="/rolling" state={{fund:fund,year:3}} className="p-2 border-2">3 years</Link>
                        <Link to="/rolling" state={{fund:fund,year:5}} className="p-2 border-2">5 years</Link>
                        <Link to="/rolling" state={{fund:fund,year:7}} className="p-2 border-2">7 years</Link>
                        <Link to="/rolling" state={{fund:fund,year:10}} className="p-2 border-2">10 years</Link>
                    </div>
                </div>

                <button className="text-blue-600">View Key Ratios</button>
                <button className="text-blue-600">View Capture Ratios</button>
                <button className="text-blue-600">View All</button>
            </div>


        </div>


    )

}


export default FundCard;