import { useLocation } from "react-router"
import { Link } from "react-router";

export default function FundDetails(){
   
    // Using use location hook to get the fund data (from the link component) . 
    const location = useLocation();

    const {fund} = location.state || {};

    return(

        <div>
            <div><Link state={{fund : fund}} className="text-blue-600 hover:underline" to="/hyginecheck">Hygine Check</Link></div>
            <div><Link className="text-blue-600 hover:underline" to="/hyginecheck">Rolling Returns Check</Link></div>
            <div><Link className="text-blue-600 hover:underline" to="/hyginecheck">Risk Vs Return Matric</Link></div>
        </div>

    )
}