import { Link } from 'react-router';
import FundImage from '../components/FundImage';

export default function FundTitle({ fund, index }) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-xl shadow-sm hover:shadow-xl transition">

      {/* Image */}
      <div className="mx-auto">
        <FundImage index={index} fundName={fund.fundName} />
      </div>

      {/* Text */}
      <h3 className="mt-4 text-center font-semibold text-gray-800">
        {fund.fundName}
      </h3>

      <Link
        to="/fundDetail"
        className="mt-2 text-sm text-blue-600 text-center hover:underline"
      >
        View details →  
      </Link>
    </div>
  );
}

