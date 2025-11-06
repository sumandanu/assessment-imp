'use client';

import Pagination from '../ui/pagination';
import { useActionState } from 'react';
import { signout } from '@/actions/auth';
import { User } from 'lucide-react';
import { PostFormModal } from './post-form-modal';
import { DeleteConfirmModal } from './delete-confirm-modal';

export function PostList({ posts }: { posts: any }) {
    const [state, actionLogout, pending] = useActionState(signout, undefined);

    return (
        <div className="mx-auto max-w-5xl mt-10">
            <div>
                <div className="navbar bg-base-100 shadow-sm  mb-10">
                    <div className="flex-1">
                        <img src="/logo.png" alt="" className="w-18" />
                    </div>
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="avatar">
                                    <div className="rounded-full">
                                        <User size={24} />
                                    </div>
                                </div>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <form action={signout}>
                                        <button type="submit">Logout</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <PostFormModal initialData={null} />
                </div>
                <ul className="list bg-base-100 rounded-box shadow-md">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
                        Most post this week
                    </li>
                    {posts?.data?.map((post: any) => (
                        <li key={post.id} className="list-row">
                            <div>
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                        <span className="text-xs">
                                            {post.author[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {post.author}
                                    {' - '}
                                    <span className="text-xs">{post.date}</span>
                                </div>
                                <div className="text-sm uppercase font-semibold opacity-60">
                                    {post.title}
                                </div>
                                <p className="text-xs uppercase">
                                    {post.category}
                                </p>
                            </div>
                            <p className="list-col-wrap text-base">
                                {post.content}
                            </p>
                            <div className="flex gap-2">
                                <PostFormModal
                                    initialData={{ payload: post || '' }}
                                />
                                <DeleteConfirmModal
                                    initialData={{ payload: post || '' }}
                                />
                            </div>
                        </li>
                    ))}

                    <li className="list-row flex justify-center">
                        <Pagination
                            currentPage={posts.current_page}
                            totalPages={posts.last_page}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}
