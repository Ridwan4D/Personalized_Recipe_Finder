import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  try {
    const db = await connectDB();
    const recipeCollection = db.collection("recipes");
    const recipes = await recipeCollection.find().toArray();
    return new Response(JSON.stringify({ recipes }), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
};
