export default function FundImage({ index, fundName }) {
  const url = fundName.split(' ')[0].toLowerCase();

  return (
    <div className="relative">
        
      <img
        src={`/images/${url}.png`}
        alt={fundName}
        className="h-48 w-full rounded-sm object-contain bg-white p-2"
        onError={(e) => {
          e.target.src = '/images/default.png';
        }}
      />

      {/* Fund Number Component */}
      <div className="flex items-center justify-center absolute top-0 bg-black text-white text-xs h-6 w-6 rounded-full">
          {index+1}
        </div>

  
    </div>
  );
}
