"use client";
import { useState } from "react";
import PostsGrid from "@/components/posts-grid";
import classnames from "classnames/bind";
import styles from "./all-posts.module.scss";
import { Post } from "@/services/posts";
import  CategoryMenu  from "@/components/category-menu/index";

const ss = classnames.bind(styles);
type Props = {
  posts: Post[];
  categories: string[];
};
const ALL_POSTS = "All posts";
export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);
  return (
    <div className={ss("wrapper")}>
      <div className={ss("container")}>
        <PostsGrid posts={filtered} />
        <CategoryMenu
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
          onClick={setSelected}
        />
      </div>
    </div>
  );
}
