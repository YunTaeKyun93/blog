import { readFile } from "fs/promises";
import path from "path";
import getAllPosts,{Post} from "@/services/posts";
export default async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
}
