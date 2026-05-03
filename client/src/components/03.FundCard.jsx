
import { Link } from "react-router";

export default function ({ fund }) {

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col gap-5 border border-gray-100">

            {/* Fund Name */}
            <div className="text-xl font-semibold text-gray-800 text-center leading-snug">
                {fund.fund_name ? fund.fund_name.split("-")[0] : "No Name"}
            </div>

            {/* AMC */}
            <div className="text-sm text-gray-500 text-center">
                {fund.amc_name || "Unknown AMC"}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">

                <div className="font-medium">AMC</div>
                <div className="text-right">{fund.amc_name || "-"}</div>

                <div className="font-medium">Plan</div>
                <div className="text-right">{fund.plan_type || "-"}</div>

                <div className="font-medium">Category</div>
                <div className="text-right">{fund.category || "-"}</div>

                <div className="font-medium">Subcategory</div>
                <div className="text-right">{fund.subcategory || "-"}</div>

            </div>

            {/* View Fund Button */}
            <Link
            
                to={`/fund/${fund.scheme_code}`}
            
                className="mt-2 bg-blue-600 text-white py-2 rounded-xl font-medium 
                            hover:cursor-pointer hover:bg-blue-700 transition-all text-center">     
                View Fund
            </Link>

        </div>
    );
}
