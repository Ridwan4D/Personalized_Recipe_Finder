"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FavoriteRecipePage = () => {
  const session = useSession();
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
  const handleDownloadPDF = (id) => {
    console.log(`Downloading PDF for recipe ID: ${id}`);
    // Add logic to generate/download PDF
  };

  const handleDelete = (id) => {
    console.log(`Deleting recipe ID: ${id}`);
    // Add logic to delete the recipe
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Favorite Recipes
      </h1>
      <div className="overflow-x-auto mx-auto w-full">
        <table className="table-auto w-full border-collapse border border-green-300 shadow-lg">
          {/* Table Header */}
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-4 py-3 border border-green-300">Image</th>
              <th className="px-4 py-3 border border-green-300">Name</th>
              <th className="px-4 py-3 border border-green-300">Category</th>
              <th className="px-4 py-3 border border-green-300">Adder Mail</th>
              <th className="px-4 py-3 border border-green-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Render Rows Dynamically */}
            {recipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-green-50">
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
                    {/* Details Button */}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleDetails(recipe.id)}
                    >
                      Details
                    </button>
                    {/* Download PDF Button */}
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleDownloadPDF(recipe.id)}
                    >
                      Download PDF
                    </button>
                    {/* Delete Button */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(recipe.id)}
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
    </div>
  );
};

export default FavoriteRecipePage;
