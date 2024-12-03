import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const favCollection = db.collection("favorites");
  try {
    const { email } = await params;
    const recipes = await favCollection.find({ adderMail: email }).toArray();
    return NextResponse.json({ recipes });
  } catch (error) {
    // console.error(error); 
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch recipes" }),
      {
        status: 500,
      }
    );
  }
};
