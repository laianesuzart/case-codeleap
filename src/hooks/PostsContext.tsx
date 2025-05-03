import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "@/services/posts";
import type { Post } from "@/types";
import type { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";

type PostPayload = Omit<Post, "created_datetime" | "id">;
type EditPayload = Omit<Post, "created_datetime" | "id" | "username">;

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  onCreatePost: (payload: PostPayload) => void;
  onEditPost: (payload: EditPayload, postId: number) => void;
  onDeletePost: (postId: number) => void;
}

const PostsContext = createContext<PostsContextType>({} as PostsContextType);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onCreatePost = async (payload: PostPayload) => {
    setIsLoading(true);
    const newPost = await createPost(payload);
    setPosts([newPost, ...posts]);
    setIsLoading(false);
  };

  const onEditPost = async (payload: EditPayload, postId: number) => {
    setIsLoading(true);
    const updatedPost = await updatePost(payload, postId);
    const postIndex = posts.findIndex((post) => post.id === postId);
    setPosts(
      posts
        .slice(0, postIndex)
        .concat(updatedPost)
        .concat(posts.slice(postIndex + 1)),
    );
    setIsLoading(false);
  };

  const onDeletePost = async (postId: number) => {
    setIsLoading(true);
    await deletePost(postId);
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    const cachedPosts = localStorage.getItem("@posts");
    if (cachedPosts) setPosts(JSON.parse(cachedPosts));
    else getPosts();
  }, []);

  useEffect(() => {
    if (posts.length) localStorage.setItem("@posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <PostsContext.Provider
      value={{ posts, isLoading, onCreatePost, onEditPost, onDeletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  return useContext(PostsContext);
}
