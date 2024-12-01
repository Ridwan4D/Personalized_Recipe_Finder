import React from "react";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button className="flex items-center justify-center w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1">
        <FaGoogle className="mr-2 h-5 w-5 text-green-600" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
