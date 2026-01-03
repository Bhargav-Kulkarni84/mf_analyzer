export default function FundImage({ index, fundName }) {
  const url = fundName.split(' ')[0].toLowerCase();

  return (
    <div className="relative">
        
      <img
        src={`/images/${url}.png`}
        alt={fundName}
        className="h-48 w-48 rounded-sm object-contain bg-white p-2"
        onError={(e) => {
          e.target.src = '/images/default.png';
        }}
      />

      <div className="flex items-center justify-center absolute bottom-0 left-20 bg-black text-white text-xs h-6 w-6 rounded-sm">
          {index+1}
        </div>

  
    </div>
  );
}
