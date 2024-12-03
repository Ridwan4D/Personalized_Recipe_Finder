import Image from "next/image";

const HomeNewRecipe = () => {
  const recipes = [
    {
      name: "Biriyani",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733254660/ce2676b0-0763-11ed-83c9-c9eb0f0bd123_oe1ppv.png",
      category: "Main Dish",
      country: "Bangladesh",
      instruction:
        "Cook rice and meat with aromatic spices, layer them, and serve with salad and yogurt.",
    },
    {
      name: "Fuchka",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733254985/fuchka3_1_vlrt6q.jpg",
      category: "Street Food",
      country: "Bangladesh",
      instruction:
        "Prepare crispy hollow shells, fill them with spiced mashed potatoes, chickpeas, tamarind water, and enjoy immediately.",
    },
  ];

  return (
    <section className="bg-green-50 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Famous Bangladeshi Recipes
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Category:</span> {recipe.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Country:</span> {recipe.country}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Instruction:</span>{" "}
                  {recipe.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNewRecipe;
