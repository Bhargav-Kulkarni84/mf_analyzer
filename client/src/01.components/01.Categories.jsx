import { Link } from "react-router";

function Categories() {

  return (

    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto ">

      {/* Heading of the Font Screen */}
      <div>
        <div className="text-2xl font-semibold">Get Started</div>
        <p className="text-slate-600 text-sm">Find mutual fund across following categories</p>
      </div>

      {/* Fund category screen */}
      <div className="text-lg">Select Fund Category</div>

    {/* Display All Funds From the database */}
      <Link to={`/fund`}>
          <div className="p-6 text-lg font-semibold rounded-xl shadow-sm transition duration-150 
                              hover:cursor-pointer hover:bg-green-100 hover:text-green-600 hover:scale-105">
                    Select All
          </div> 
      </Link>
    

    {/* Gives option to select fund category */}
      <div className="grid grid-cols-1 gap-6">
      {
        ["Equity","Debt","Hybrid","Solution Oriented","Others"] .map((category,index)=>(

            <Link key={index} to={`/${category.toLowerCase()}`}>
              <div className="p-6 text-lg font-semibold rounded-xl shadow-sm transition duration-150 
                            hover:cursor-pointer hover:bg-green-100 hover:text-green-600 hover:scale-105">
                  {category}
                </div> 
            </Link>
        ))
      }
      </div>

      
    </div>
  )
}

export default Categories
