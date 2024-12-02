import HomeRecipes from "@/component/HomeRecipes/HomeRecipes";
import Slider from "@/component/Slider/Slider";

export default function Home() {
  return (
    <div>
      <section className="md:mt-10 z-10">
        <Slider />
      </section>
      <section className="my-10">
        <HomeRecipes />
      </section>
    </div>
  );
}
