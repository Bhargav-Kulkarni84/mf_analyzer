import { useParams } from "react-router";
import { fundCategories } from "../helpers/fundCategories";
import { useState } from "react";

export default function SubCategories() {

    //Filter to store the selected sub categories.
    const [filters,setFilters] = useState([]); 

  const { category } = useParams();

  //Get the sub category array on the basis of user entered category.
  const selectedCategory = fundCategories.find((fund) => fund.name.toLowerCase() === category);

  if (!selectedCategory) {
    return <div className="p-8">Category not found</div>;
  }

  //Function to handle click to add the fund to filters list when user clicks on it.
  function handleClick(subcategory){

    const exists = filters.includes(subcategory);
    //Return a new array without the subcategory element.
    if(exists) setFilters(prev=> prev.filter(val => val !== subcategory));

    else setFilters(prev=> [...prev,subcategory]);

  }

  function clearFund(){
    setFilters([]);
  }

  //Function which returns true if subcategory exists in the filters .
  function exists(subcategory){
        return filters.includes(subcategory)
  }

  return (
    <div className="flex flex-col items-center p-8 gap-8 max-w-6xl mx-auto">

      <h2 className="text-2xl font-semibold ">
        {selectedCategory.name} Funds
      </h2>

    {/* Filters */}
    <div className="flex justify-between gap-6">
      <div className="p-4 shadow-md bg border-2 border-sky-200 rounded-xl w-50px hover:scale-105 hover:text-sky-400">Search Filtered</div>
      <div onClick={clearFund} className="p-4 shadow-md bg border-2 border-red-200 rounded-xl w-50px hover:scale-105 hover:text-red-400">Clear All Filters</div>
    </div>

      <div className="grid grid-cols-4 gap-8 max-w-3xl ">
        {selectedCategory.subcategories.map((subcategory, index) => (
          
          <div key={index} onClick={()=>handleClick(subcategory)}
            
            className={`p-6 rounded-lg shadow-md hover:scale-105 transition cursor-pointer 
                ${exists(subcategory) ? "border-1 border-green-200 text-green-500 " : ""}`}>
                    
            {subcategory}
          </div>

        ))}
      </div>

    </div>
  );
}