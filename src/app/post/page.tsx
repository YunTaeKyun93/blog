import FilterablePosts from '@/components/fiterable-posts';
import  getAllPosts  from '@/services/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return <FilterablePosts posts={posts} categories={categories} />;
}
