import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const favCollection = db.collection("favorites");
  try {
    const res = await favCollection.deleteOne({
      _id: new ObjectId(params?.id),
    });
    return NextResponse.json({
      message: "Deleted Successfully",
      response: res,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
};
