import Hero from "../components/Hero.jsx";
import CategoryTiles from "../components/CategoryTiles.jsx";
import BestSellers from "../components/BestSellers.jsx";
import Testimonials from "../components/Testimonials.jsx";
import CategoryStage from "../components/CategoryStage";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <BestSellers />
      <Testimonials />
      <CategoryStage />
    </>
  );
}