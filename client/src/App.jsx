import { useState } from "react"

function App() {

  const [category,setCategory] = useState(null);  
  // const [subCategory, setSubCategory] = useState(null);

  function handleClick(c){
    console.log(c);
    if(category === c) setCategory(null);
    else setCategory(c);
  }

  return (

    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto ">

      {/* Heading of the Font Screen */}
      <div>
        <div className="text-2xl font-semibold">Get Started</div>
        <p className="text-slate-600 text-sm">Find mutual fund across following categories</p>
      </div>

      {/* Fund category screen */}
      <div className="text-lg">Select Fund Category</div>

    {/* Gives option to select fund category */}
    <div>
      <div className="grid grid-cols-1 gap-6">
      {
        ["Equity","Debt","Hybrid","Solution Oriented","Others"] .map((c)=>(

              <div className={
                `p-6 text-lg font-semibold rounded-xl shadow-sm transition duration-150 cursor-pointer
                 ${category === c ? "bg-green-100 text-green-600 scale-105" 
                                  : "bg-gray-50 hover:shadow-md hover:scale-105 hover:bg-green-50"}
                 `}
                  onClick={()=>handleClick(c)}>
                  {c}
                </div> 
        ))
      }
      </div>


      </div>
      
    </div>
  )
}

export default App
