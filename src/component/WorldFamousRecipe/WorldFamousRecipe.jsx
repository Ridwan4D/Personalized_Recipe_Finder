import Image from "next/image";

const WorldFamousRecipes = () => {
  const recipes = [
    {
      name: "Pizza Margherita",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733256201/Margherita-Pizza-2-1200_althew.jpg",
      category: "Italian Cuisine",
      country: "Italy",
      instruction:
        "Prepare a thin crust dough, top with tomato sauce, fresh mozzarella, basil leaves, and bake in a hot oven until crispy and bubbling.",
    },
    {
      name: "Fish and Chips",
      image:
        "https://res.cloudinary.com/duv5fiurz/image/upload/v1733256200/images_14_bbzpz3.jpg",
      category: "English Cuisine",
      country: "England",
      instruction:
        "Batter and deep-fry fish fillets until golden brown, and serve with crispy chips, mushy peas, and tartar sauce.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-yellow-100 to-yellow-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-yellow-700 mb-10">
          World Famous Recipes
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="group bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="relative w-full h-72">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-800 mb-3 group-hover:text-yellow-600 transition duration-300">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-bold">Category:</span> {recipe.category}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-bold">Country:</span> {recipe.country}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
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

export default WorldFamousRecipes;
