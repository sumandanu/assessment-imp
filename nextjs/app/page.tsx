import { PostList } from '@/components/posts/post-list';
import { postsAPI } from '@/lib/api';

export default async function Post({ searchParams }: any) {
    const { page } = await searchParams;

    const response = await postsAPI.getAll(page ? Number(page) : 1);
    const postList = response.data;

    return <PostList posts={postList} />;
}
