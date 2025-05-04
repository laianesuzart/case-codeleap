import { Fallback } from "@/components/Fallback";
import { Loader } from "@/components/Loader";
import FeedPost from "@/components/modules/FeedPost";
import { ConfirmDeleteActionModal } from "@/components/widgets/ConfirmDeleteActionModal";
import { EditPostModal } from "@/components/widgets/EditPostModal";
import { Header } from "@/components/widgets/Header";
import {
  createPost,
  deletePost,
  fetchPosts,
  updatePost,
} from "@/services/posts";
import type { Post } from "@/types";
import {
  QueryErrorResetBoundary,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAppForm } from "../hooks/form";
import { useStore } from "../lib/store";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.username) {
      throw redirect({
        to: "/signup",
        viewTransition: { types: ["slide-right"] },
      });
    }
  },
  component: Home,
});

const schema = z.object({
  title: z.string().min(1, "Required field").max(128, "Title is too long"),
  content: z.string().min(1, "Required field").max(2048, "Content is too long"),
});

const usePosts = () =>
  useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

function Feed() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { username } = useStore((state) => state);
  const { queryClient } = Route.useRouteContext();
  const { data: posts } = usePosts();

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onMutate: () => setIsPending(true),
    onSuccess: (data) => queryClient.setQueryData(["posts"], [data, ...posts]),
    onError: () => toast.error("Please try again"),
    onSettled: () => setIsPending(false),
  });

  const editPostMutation = useMutation({
    mutationFn: (newPost: { title: string; content: string; id: number }) => {
      return updatePost(
        { title: newPost.title, content: newPost.content },
        newPost.id,
      );
    },
    onMutate: () => setIsPending(true),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["posts"],
        posts.map((post) => (data.id === post.id ? data : post)),
      );
      handleCloseEditModal();
    },
    onError: () => toast.error("Please try again"),
    onSettled: () => setIsPending(false),
  });

  const deletePostMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deletePost(id);
    },
    onMutate: () => setIsPending(true),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["posts"],
        posts.filter((post) => post.id !== variables.id),
      );
      toast.success("Post deleted");
      setIsDeleteModalOpen(false);
    },
    onError: () => toast.error("Please try again"),
    onSettled: () => setIsPending(false),
  });

  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: async ({ value, formApi }) => {
      await addPostMutation.mutateAsync({ username, ...value });
      formApi.reset();
    },
  });

  const handleEditPost = async (values: {
    title: string;
    content: string;
    id: number;
  }) => {
    await editPostMutation.mutateAsync(values);
  };

  const handleOpenEditModal = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedPost(null);
    setIsEditModalOpen(false);
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;
    deletePostMutation.mutate({ id: selectedPost.id });
  };

  const handleOpenDeleteModal = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPost(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <EditPostModal
        isOpen={isEditModalOpen}
        post={selectedPost}
        onClose={handleCloseEditModal}
        onSave={handleEditPost}
        disabledFields={isPending}
      />
      <ConfirmDeleteActionModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeletePost}
        loading={isPending}
      />
      <div className="min-h-dvh pb-10 max-w-[50rem] bg-white mx-auto [view-transition-name:main-content]">
        <Header />
        <main className="p-6 grid gap-6 items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="p-6 border-1 border-solid border-[#999] rounded-2xl"
          >
            <fieldset className="grid gap-6 [&>:last-child]:place-self-end">
              <legend className="highlighted-text pb-4">
                What&rsquo;s on your mind{username ? `, ${username}` : ""}?
              </legend>
              <form.AppField name="title">
                {(field) => (
                  <field.TextField
                    label="Title"
                    placeholder="Hello world"
                    disabled={isPending}
                  />
                )}
              </form.AppField>
              <form.AppField name="content">
                {(field) => (
                  <field.TextArea
                    label="Content"
                    placeholder="Content here"
                    disabled={isPending}
                  />
                )}
              </form.AppField>
              <form.AppForm>
                <form.SubscribeButton label="Create" />
              </form.AppForm>
            </fieldset>
          </form>
          <ul className="grid gap-6">
            {posts.map((post) => (
              <li key={post.id}>
                <FeedPost
                  post={post}
                  isOwnerUser={post.username === username}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                />
              </li>
            ))}
          </ul>
          {!posts.length && (
            <div className="p-6 border-1 border-dashed border-primary">
              <p className="text-center">Nothing here yet, try adding a post &#128516;</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function Home() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
          <Suspense fallback={<Loader />}>
            <Feed />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
