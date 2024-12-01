"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
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
        <Link
          href="/login"
          className="btn bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
