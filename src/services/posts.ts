import HttpClient from "@/lib/http-client";
import type { Post } from "@/types";

const baseUrl = import.meta.env.VITE_CODELEAP_API_BASE_URL;
const client = new HttpClient(baseUrl);

const response = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 71519,
      username: "teste",
      created_datetime: "2025-05-02T16:53:52.478128Z",
      title: "Lorem ipsum dolor sit amet, consectetur?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis pellentesque ornare. Mauris augue orci, ornare consequat dictum sit amet, lacinia placerat nisl.\nDonec consequat libero eros, vel ornare diam efficitur at. Duis pulvinar sem porta nunc aliquam, vel egestas sapien pellentesque. Phasellus laoreet scelerisque lectus. Sed in tristique risus, nec blandit felis. Duis eget mi hendrerit, dignissim ex et, ultricies sapien. Cras eu rhoncus mi. Suspendisse potenti. Curabitur molestie lacus vitae erat ornare vulputate. Morbi sodales, quam ut faucibus.",
      author_ip: "177.34.79.14",
    },
    {
      id: 71508,
      username: "lai",
      created_datetime: "2025-05-02T16:45:15.995872Z",
      title: "Hello World!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor finibus augue at imperdiet. Morbi scelerisque turpis in lacus finibus porttitor. Vestibulum vitae tempor odio, ac imperdiet erat. Suspendisse nisl arcu, lacinia sit amet molestie at, mollis ac ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum dignissim odio non mauris sollicitudin auctor. Nulla convallis placerat lorem, et finibus quam eleifend ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean eget lectus sed purus egestas aliquet. Aliquam tempus semper erat et tincidunt. Fusce nisl nisl, vehicula in varius at, sodales commodo ex. Aliquam luctus elementum ipsum, non porttitor lorem efficitur tincidunt. Vivamus neque neque, facilisis et imperdiet vitae, faucibus vel odio.\n\nPhasellus eu ex sit amet sem auctor suscipit. Integer at gravida lorem. Maecenas fringilla, neque sit amet iaculis laoreet, eros felis fringilla enim, sed fermentum enim metus at arcu. Proin rutrum sollicitudin nulla, ut molestie erat viverra sit amet. Phasellus suscipit tortor ipsum, vitae elementum nisi congue sed. Aenean vehicula massa nec diam sodales commodo. Donec sit amet sollicitudin nisi, non consectetur ipsum. Nullam id interdum leo. Curabitur scelerisque vel erat vel vulputate.",
      author_ip: "177.34.79.14",
    },
  ],
};

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
