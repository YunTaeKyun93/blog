import PostsGrid from "@/components/posts-grid";
import getFeaturedPosts from "@/services/featured-posts";
import classnames from "classnames/bind";
import styles from "./featured-posts.module.scss";
const ss = classnames.bind(styles);
export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();
  return (
    <div className={ss('wrapper')}>
      <div className={ss('container')}>
        <h2>Featured Posts</h2>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
