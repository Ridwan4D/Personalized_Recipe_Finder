import Image from "next/image";
import Link from "next/link";
import React from "react";

const getRecipes = async () => {
  const res = await fetch("http://localhost:3000/services/api/allRecipe");
  const recipes = res.json();
  return recipes;
};

const HomeRecipes = async () => {
  const { recipes } = await getRecipes();
  // console.log(recipes);
  return (
    <section className="p-6 bg-gray-50">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Featured Recipes</h1>
        <p className="text-gray-600 mt-2">
          Discover delicious recipes tailored to your preferences.
        </p>
        <div className="mt-4 mx-auto w-16 h-1 bg-green-600 rounded-full"></div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {recipes?.slice(4, 8).map((recipe, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {/* Recipe Image */}
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />

            {/* Recipe Info */}
            <div className="p-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-green-600">Category:</span>{" "}
                {recipe.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-green-600">Protein:</span>{" "}
                {recipe.protein}g
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-green-600">Calories:</span>{" "}
                {recipe.calories} kcal
              </p>
            </div>
            {/* View Details Button */}
            <Link
              href={`/services/${recipe?._id}`}
              className="block mt-4 text-center text-white bg-green-600 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeRecipes;
