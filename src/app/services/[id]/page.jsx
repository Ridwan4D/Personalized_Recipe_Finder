"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const RecipeDetailsPage = ({ params }) => {
  const session = useSession();
  const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const loadData = async () => {
    const res = await fetch(
      `http://localhost:3000/my-favorite/api/${session?.data?.user?.email}`
    );
    const data = await res.json();
    console.log(data);
    setRecipes(data.recipes);
  };

  useEffect(() => {
    loadData();
  }, [session]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/services/api/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch the recipe");
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
    if (theRecipe) {
      toast.error("Already added");
      return;
    } else {
      if (session.status == "authenticated") {
        const favInfo = {
          recipeId: recipe?._id,
          name: recipe?.name,
          image: recipe?.image,
          category: recipe?.category,
          adderMail: session?.data?.user?.email,
        };
        // console.log(favInfo);
        const res = await fetch(
          "http://localhost:3000/addFevorite/api/fevorite",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(favInfo),
          }
        );
        // console.log(res);
        if (res.status === 200) {
          toast.success("Added to Favorite");
        }
      } else {
        toast.error("User not found");
      }
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-green-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Error: Unable to load recipe details
        </h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 px-2 py-1 mt-16">
      {/* Action Buttons at the Top */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={handleGoBack}
          className="bg-gray-300 text-gray-800 py-3 px-6 rounded-full shadow-lg hover:bg-gray-400 hover:shadow-xl transition-all duration-300"
        >
          Go Back
        </button>
        <button
          onClick={handleAddFavorite}
          className="bg-green-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300"
        >
          Add to Favorite
        </button>
      </div>
      {/* Header Section */}
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          {recipe?.name}
        </h1>
        <p className="text-lg text-green-600 italic">{recipe?.category}</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-6">
        {/* Recipe Image */}
        <div className="flex justify-center">
          <Image
            src={recipe?.image}
            alt={recipe?.name}
            width={600}
            height={600}
            className="rounded-lg shadow-xl border-4 border-green-200 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Recipe Details */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-green-300">
          {/* Nutritional Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Nutritional Information
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-bold text-green-600">Calories:</span>{" "}
                {recipe?.calories} kcal
              </p>
              <p>
                <span className="font-bold text-green-600">Protein:</span>{" "}
                {recipe?.protein}g
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {recipe?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
