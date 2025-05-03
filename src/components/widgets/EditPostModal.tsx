import { usePostsContext } from "@/hooks/PostsContext";
import { useAppForm } from "@/hooks/form";
import type { Post } from "@/types";
import { useEffect } from "react";
import { z } from "zod";
import { Button } from "../elements/Button";
import { Modal } from "../elements/Modal";

interface Props {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
}

const schema = z.object({
  title: z.string().min(1, "Required field").max(128, "Title is too long"),
  content: z.string().min(1, "Required field").max(2048, "Content is too long"),
});

export function EditPostModal({ isOpen, post, onClose }: Props) {
  const { onEditPost } = usePostsContext();
  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value, formApi }) => {
      if (!post) return;
      onEditPost({ title: value.title, content: value.content }, post.id);
      formApi.reset();
      onClose();
    },
  });

  useEffect(() => {
    if (post) {
      form.setFieldValue("title", post.title);
      form.setFieldValue("content", post.content);
    }
  }, [post, form]);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <fieldset className="grid gap-6 [&>:last-child]:place-self-end">
            <legend className="highlighted-text pb-4">Edit item</legend>
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
            <div className="flex gap-4">
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <form.AppForm>
                <form.SubscribeButton label="Save" variant="success" />
              </form.AppForm>
            </div>
          </fieldset>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
