import { Link } from "react-router";

function FundCard(fund){

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
                <button className="text-blue-600">View Rolling Returns</button>
                <button className="text-blue-600">View Key Ratios</button>
                <button className="text-blue-600">View Capture Ratios</button>
                <button className="text-blue-600">View All</button>
            </div>


        </div>



    )

}


export default FundCard;