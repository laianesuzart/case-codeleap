import FeedPost from "@/components/modules/FeedPost";
import { ConfirmDeleteActionModal } from "@/components/widgets/ConfirmDeleteActionModal";
import { EditPostModal } from "@/components/widgets/EditPostModal";
import { Header } from "@/components/widgets/Header";
import { PostsProvider, usePostsContext } from "@/hooks/PostsContext";
import type { Post } from "@/types";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
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

function Feed() {
  const { username } = useStore((state) => state);
  const { posts = [], onCreatePost, onDeletePost } = usePostsContext();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value, formApi }) => {
      onCreatePost({ username, ...value });
      formApi.reset();
    },
  });

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
    setIsDeleteModalOpen(false);
    onDeletePost(selectedPost.id);
    toast.success("Post deleted");
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
      />
      <ConfirmDeleteActionModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeletePost}
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
                What&rsquo;s on your mind, {username}?
              </legend>
              <form.AppField name="title">
                {(field) => (
                  <field.TextField label="Title" placeholder="Hello world" />
                )}
              </form.AppField>
              <form.AppField name="content">
                {(field) => (
                  <field.TextArea label="Content" placeholder="Content here" />
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
        </main>
      </div>
    </>
  );
}

function Home() {
  return (
    <PostsProvider>
      <Feed />
    </PostsProvider>
  );
}
