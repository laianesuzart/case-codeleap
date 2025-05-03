import HttpClient from "@/lib/http-client";
import type { Post } from "@/types";

const baseUrl = import.meta.env.VITE_CODELEAP_API_BASE_URL;
const client = new HttpClient(baseUrl);

type ListResponse<T> = {
  count: number;
  results: Array<T>;
};

export async function fetchPosts() {
  const data = await client.get<ListResponse<Post>>("/careers/");
  return data.results.sort((a, b) =>
    b.created_datetime.localeCompare(a.created_datetime),
  );
}

export async function createPost(payload: {
  username: string;
  title: string;
  content: string;
}) {
  const data = await client.post<Post>("/careers/", payload);
  return data;
}

export async function updatePost(
  payload: {
    title: string;
    content: string;
  },
  postId: number,
) {
  const data = await client.patch<Post>(`/careers/${postId}/`, payload);
  return data;
}

export async function deletePost(postId: number) {
  await client.delete(`/careers/${postId}/`);
}
