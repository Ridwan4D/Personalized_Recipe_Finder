/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FavoriteRecipePage = () => {
  const session = useSession();
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
    } catch (error) {
      console.error("Error loading recipes:", error);
      toast.error("Failed to load favorite recipes. Please try again later.");
    }
  };

  useEffect(() => {
    if (session?.data?.user?.email) {
      loadData();
    }
  }, [session]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleted = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/my-favorite/api/deleteFavorite/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!deleted.ok) {
            throw new Error("Failed to delete the recipe.");
          }

          loadData();
          toast.success("Recipe Deleted");
        } catch (error) {
          console.error("Error deleting recipe:", error);
          toast.error("Failed to delete the recipe. Please try again.");
        }
      }
    });
  };

  return (
    <div className="h-auto mt-20 bg-gradient-to-b from-green-50 to-green-100 py-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Favorite Recipes
      </h1>
      {recipes.length > 0 ? (
        <div className="overflow-x-auto mx-auto w-full">
          <table className="table-auto w-full border-collapse border border-green-300 shadow-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 border border-green-300">Image</th>
                <th className="px-4 py-3 border border-green-300">Name</th>
                <th className="px-4 py-3 border border-green-300">Category</th>
                <th className="px-4 py-3 border border-green-300">
                  Adder Mail
                </th>
                <th className="px-4 py-3 border border-green-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recipes.map((recipe, idx) => (
                <tr key={idx} className="hover:bg-green-50">
                  <td className="border border-green-300 px-4 py-3">
                    <div className="flex justify-center">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            width={48}
                            height={48}
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-16 w-16 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe.name}
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe.category}
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe.adderMail}
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/services/${recipe?.recipeId}`}
                        className="btn btn-sm btn-info"
                      >
                        Details
                      </Link>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h11m4 0h3m-4 0a4 4 0 10-8 0m8 0a4 4 0 11-8 0m6 5H7m0 0l-1 2m1-2l1 2m10-2l-1 2m1-2l1 2"
            />
          </svg>
          <p className="text-center text-xl font-semibold text-green-700">
            You don&apos;t have any favorite recipes yet!
          </p>
          <p className="text-center text-md text-green-500">
            Start exploring and add some recipes to your favorites to see them
            here.
          </p>
          <button className="mt-4 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md">
            Explore Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipePage;
