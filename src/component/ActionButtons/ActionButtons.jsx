"use client";

import React from "react";

const ActionButtons = ({ recipeId }) => {
  const handleAddFavorite = () => {
    alert("Recipe added to favorites!");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
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
  );
};

export default ActionButtons;
