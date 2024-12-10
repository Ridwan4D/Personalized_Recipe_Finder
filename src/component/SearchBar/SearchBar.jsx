"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const getRecipes = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/allRecipe`
  );
  const data = await res.json();
  return data.recipes;
};

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(true);
  const searchRef = useRef(null);
  const [recipes, setRecipes] = useState([]);

  const loadData = async () => {
    const recipesData = await getRecipes();
    setRecipes(recipesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  console.log(recipes);
  // Filter recipes based on the search input
  const filteredRecipes = recipes.filter((recipe) => {
    const searchTerm = search.toLowerCase();
    return (
      recipe?.name?.toLowerCase().includes(searchTerm) ||
      recipe?.category?.toLowerCase().includes(searchTerm) ||
      recipe?.ingredients?.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm)
      )
    );
  });

  return (
    <div className="relative w-full bg-white py-4 px-4 shadow-md z-50">
      {/* Search Form */}
      <form
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
          setShowResults(true);
        }}
        className="flex w-full"
      >
        <input
          type="text"
          name="search"
          placeholder="Search recipes"
          className="flex-grow border border-green-400 p-3 text-lg rounded-l-md focus:outline-none focus:border-green-600"
        />
        <button
          type="button"
          className="bg-green-500 text-white px-5 py-3 rounded-r-md hover:bg-green-600 focus:outline-none"
        >
          Search
        </button>
      </form>

      {/* Conditionally Render Search Results */}
      {search && showResults && (
        <div
          id="search_id"
          ref={searchRef}
          className="absolute top-full left-0 mt-2 w-full max-h-80 bg-gray-100 shadow-lg rounded-lg overflow-auto p-4"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, idx) => (
                <Link
                  key={idx}
                  href={`/services/${recipe?._id}`}
                  onClick={() => showResults(false)}
                  className="flex flex-col md:flex-row items-center p-3 bg-white rounded-md hover:shadow-md"
                >
                  <Image
                    src={recipe?.image}
                    alt={recipe?.name}
                    height={100}
                    width={100}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-3">
                    <h3 className="text-md font-semibold text-gray-700">
                      {recipe?.name}
                    </h3>
                    <p className="text-green-500 text-sm">
                      {recipe?.ingredients.slice(0, 3).join(", ")}...
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center">
                <p className="inline font-bold text-gray-600">
                  No Recipes Found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
