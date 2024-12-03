import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = await params;
  console.log(id);
  try {
    const db = await connectDB();
    const recipeCollection = db.collection("recipes");
    const recipe = await recipeCollection.findOne({ _id: new ObjectId(id) });
    return new NextResponse(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch recipes" }),
      {
        status: 500,
      }
    );
  }
};
