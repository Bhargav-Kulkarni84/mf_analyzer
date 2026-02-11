import { Link } from "react-router"
import FundImage from "./FundImage"

export default function IndexCard({fund,index,link}){

    return(

        <div className='flex flex-col gap-4 p-4 m-4 border-1 rounded-lg '>

             {/* Image Logo */}

            <FundImage index={index} link={link}/>

            <div>
                {fund.schemeName}
            </div>
            
            <Link className='text-blue-600' state={{fund}} to = {`/fund/${fund.schemeCode}`} >
                Go To Fund
            </Link>
                

        </div>

    )


}