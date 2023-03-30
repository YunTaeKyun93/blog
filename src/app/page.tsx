import classnames from "classnames/bind";
// import styles from "./header.module.scss";
import FeaturedPosts from "../components/featured-posts";
import Hero from "../components/hero";
import CarouselPosts from "./../components/carousel-posts/index";
// const ss = classnames.bind(styles);
export default function Home() {
  return (
    <div>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/*@ts-expect-error Server Component */}
      <CarouselPosts />
    </div>
  );
}
