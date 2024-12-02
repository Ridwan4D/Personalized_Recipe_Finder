import { connectDB } from "@/lib/connectDB";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const favCollection = db.collection("favorites");
  try {
    const recipes = await favCollection
      .find({ adderMail: params?.email })
      .toArray();
    return Response.json({ recipes });
  } catch (error) {
    console.error(error); // Log the error
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
};
