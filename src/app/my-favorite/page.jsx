/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import jsPDF from "jspdf";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
            { method: "DELETE" }
          );

          if (!deleted.ok) {
            throw new Error("Failed to delete the recipe?.");
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

  const handleDownloadPDF = (recipe) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text(recipe?.name || "Recipe Name", 10, 10);
    doc.setFont("helvetica", "normal");
    if (recipe?.image) {
      doc.addImage(recipe?.image, "JPEG", 10, 20, 60, 40);
    }
    doc.text(`Category: ${recipe?.category || "Unknown"}`, 10, 70);
    doc.text("Ingredients:", 10, 80);
    (recipe?.ingredients || []).forEach((ingredient, index) => {
      doc.text(`- ${ingredient}`, 10, 90 + index * 10);
    });
    doc.text(`Protein: ${recipe?.protein || "N/A"}g`, 10, 140);
    doc.text(`Calories: ${recipe?.calories || "N/A"}`, 10, 150);
    const description = recipe?.description || "No description available.";
    doc.text("Description:", 10, 160);
    doc.text(description.toString(), 10, 170, { maxWidth: 190 });
    doc.save(`${recipe?.name || "Recipe"}.pdf`);
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
                            src={recipe?.image}
                            alt={recipe?.name}
                            className="h-16 w-16 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe?.name}
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe?.category}
                  </td>
                  <td className="border border-green-300 px-4 py-3">
                    {recipe?.adderMail}
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
                        onClick={() => handleDelete(recipe?._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleDownloadPDF(recipe)}
                      >
                        Download PDF
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
          {/* Empty state content */}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipePage;
