import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const favoriteItem = await request.json();
  const { id } = await params;
  console.log(id);
  const db = await connectDB();
  const favoriteCollection = db.collection("favorites");
  try {
    const fev = await favoriteCollection.insertOne(favoriteItem);
    return NextResponse.json({ message: "Recipe Added to Fav" });
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
