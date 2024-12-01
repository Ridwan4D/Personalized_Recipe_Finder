"use client";
import { data } from "autoprefixer";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
  const session = useSession();
  // console.log(session);
  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="navbar bg-white shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-emerald-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className={`${
                  pathName === link?.path ? "text-emerald-600" : "text-gray-700"
                } font-semibold hover:text-emerald-400`}
              >
                <Link href={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-emerald-600">Recipe Finder</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className={`${
                pathName === link?.path ? "text-emerald-600" : "text-gray-700"
              } font-semibold hover:text-emerald-400`}
            >
              <Link href={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {session?.status === "authenticated" && (
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 p-2 rounded-full"
            >
              {session?.data?.user?.image ? (
                <Image
                  src={session?.data?.user?.image}
                  alt="User Image"
                  height={200}
                  width={200}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-black">
                  {session?.data?.user?.name?.[0]?.toUpperCase()}
                </div>
              )}
            </button>

            {/* Dropdown with Name and Logout */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 p-4 bg-white shadow-md rounded-lg w-48">
                <p className="font-semibold text-gray-700">
                  {session?.data?.user?.name}
                </p>
                <button
                  className="w-full mt-2 p-2 text-sm text-white font-semibold bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {session?.status === "loading" && <p>Loading...</p>}
        {session?.status === "unauthenticated" && (
          <Link
            href="/login"
            className="btn bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "All Recipe",
    path: "/allRecipe",
  },
  {
    title: "Favorite Recipes",
    path: "/favoriteRecipes",
  },
];
export default Navbar;
