export const dynamic = "force-dynamic";

import HomeNewRecipe from "@/component/HomeNewRecipe/HomeNewRecipe";
import HomeRecipes from "@/component/HomeRecipes/HomeRecipes";
import Slider from "@/component/Slider/Slider";
import WorldFamousRecipes from "@/component/WorldFamousRecipe/WorldFamousRecipe";

export default function Home() {
  return (
    <div>
      <section className="md:mt-10 z-10">
        <Slider />
      </section>
      <section className="my-10">
        <HomeRecipes />
      </section>
      <section className="my-10">
        <HomeNewRecipe />
      </section>
      <section className="my-10">
        <WorldFamousRecipes />
      </section>
    </div>
  );
}
