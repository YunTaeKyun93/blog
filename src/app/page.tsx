import classnames from "classnames/bind";
import '../styles/Home.module.css'
import FeaturedPosts from "../components/featured-posts";
import Hero from "../components/hero";
import CarouselPosts from "./../components/carousel-posts/index";

export default function Home() {
  return (
    <div className="wrapper">
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/*@ts-expect-error Server Component */}
      <CarouselPosts />
    </div>
  );
}
