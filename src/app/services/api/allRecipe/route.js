import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const recipeCollection = db.collection("recipes");
    const recipes = await recipeCollection.find().toArray();
    return new NextResponse(JSON.stringify({ recipes }), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error
    return new NextResponse(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
};
