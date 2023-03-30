import classnames from "classnames/bind";
import styles from "./carousel-posts.module.scss";
import getNonFeaturedPosts from "@/services/non-featured-posts";
import PostCard from "./../post-card/index";
import MultiCarousel from "./../multi-carousel/index";

const ss = classnames.bind(styles);
export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();
  return (
    <div>
      <h2>You May Like This!!</h2>
      <MultiCarousel>
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </MultiCarousel>
    </div>
  );
}
