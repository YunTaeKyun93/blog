import { Post } from "@/services/posts";
import PostCard from "./../post-card/index";
import classnames from "classnames/bind";
import styles from "./posts-grid.module.scss";
const ss = classnames.bind(styles);
type Props = { posts: Post[] };
export default function PostsGrid({ posts }: Props) {
  return (
    <div className={ss("wrapper")}>
      <ul className={ss('grid')}>
        {posts.map((post) => (
          <li key={post.path}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
