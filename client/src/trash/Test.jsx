import { useParams } from "react-router";
import { fundCategories } from "../helpers/fundCategories";

export default function Test() {

  const { category } = useParams();

  //Get the sub category array on the basis of user entered category.
  const selectedCategory = fundCategories.find((fund) => fund.name.toLowerCase() === category);


  if (!selectedCategory) {
    return <div className="p-8">Category not found</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        {selectedCategory.name} Funds
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {selectedCategory.subcategories.map((subcategory, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-md hover:scale-105 hover:bg-green-100 hover:text-green-600 transition cursor-pointer"
          >
            {subcategory}
          </div>
        ))}
      </div>
    </div>
  );
}