/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const RecipeDetailsPage = ({ params }) => {
  const session = useSession();
  const { id } = React.use(params);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/my-favorite/api/${session?.data?.user?.email}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch favorite recipes.");
      }
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      loadData();
    }
  }, [session]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch the recipe.");
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const theRecipe = recipes.find((recipe) => recipe?.recipeId === id);

  const handleAddFavorite = async () => {
    try {
      if (theRecipe) {
        toast.error("Already added to favorites.");
        return;
      }
      if (session.status === "authenticated") {
        const favInfo = {
          recipeId: recipe?._id,
          name: recipe?.name,
          image: recipe?.image,
          category: recipe?.category,
          adderMail: session?.data?.user?.email,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/addFevorite/api/fevorite`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(favInfo),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to add to favorites.");
        }
        toast.success("Added to Favorite.");
      } else {
        toast.error("User not authenticated.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg sm:text-xl text-green-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-red-600">
          Error: Unable to load recipe details
        </h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 sm:mt-8">
        <button
          onClick={handleGoBack}
          className="bg-gray-300 text-gray-800 py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
        >
          Go Back
        </button>
        <button
          onClick={handleAddFavorite}
          className="bg-green-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
        >
          Add to Favorite
        </button>
      </div>
      <div className="container mx-auto text-center mt-6 sm:mt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-2 sm:mb-4">
          {recipe?.name}
        </h1>
        <p className="text-base sm:text-lg text-green-600 italic">
          {recipe?.category}
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mt-4 sm:mt-6">
        <div className="flex justify-center">
          <Image
            src={recipe?.image}
            alt={recipe?.name}
            width={500}
            height={500}
            className="rounded-lg shadow-xl border-4 object-contain border-green-200 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-green-300">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold text-green-700 mb-2 sm:mb-4">
              Nutritional Information
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-bold text-green-600">Calories:</span>{" "}
              {recipe?.calories} kcal
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-bold text-green-600">Protein:</span>{" "}
              {recipe?.protein}g
            </p>
          </div>
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-4">
              Ingredients
            </h3>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-2 sm:mb-4">
              Description
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              {recipe?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
