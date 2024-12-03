"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getRecipes = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/allRecipe`
  );
  const recipes = res.json();
  return recipes;
};

const AllRecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const loadData = async () => {
    const { recipes } = await getRecipes();
    setRecipes(recipes);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        All Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? (
          recipes.map((recipe, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={recipe.image}
                alt={recipe.name}
                width={200}
                height={300}
                className="h-56 p-1 rounded-t-xl w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800">
                  {recipe.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Category: {recipe.category}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold text-green-600">
                    Protein:{" "}
                    <span className="text-green-800">{recipe.protein}g</span>
                  </p>
                  <p className="text-sm font-semibold text-yellow-600">
                    Calories:{" "}
                    <span className="text-yellow-800">
                      {recipe.calories} kcal
                    </span>
                  </p>
                </div>
                <p className="text-gray-700 line-clamp-3">
                  {recipe.description}
                </p>
              </div>
              <div className="p-4 border-t border-green-100 flex justify-end items-center">
                <Link
                  href={`/services/${recipe?._id}`}
                  className="text-green-600 px-4 py-2 rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No recipes available at the moment. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRecipePage;
