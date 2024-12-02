import { connectDB } from "@/lib/connectDB";

export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const favCollection = db.collection("favorites");
  try {
    const res = await favCollection.deleteOne({ _id: params?.id });
    return Response.json({ message: "Deleted Successfully", response: res });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
};
