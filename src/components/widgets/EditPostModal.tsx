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
  onSave: (values: {
    title: string;
    content: string;
    id: number;
  }) => Promise<void>;
  disabledFields?: boolean;
}

const schema = z.object({
  title: z.string().min(1, "Required field").max(128, "Title is too long"),
  content: z.string().min(1, "Required field").max(2048, "Content is too long"),
});

export function EditPostModal({
  isOpen,
  post,
  onClose,
  onSave,
  disabledFields = false,
}: Props) {
  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      if (!post) return;
      await onSave({ title: value.title, content: value.content, id: post.id });
    },
  });

  useEffect(() => {
    if (post) {
      form.setFieldValue("title", post.title);
      form.setFieldValue("content", post.content);
    }
  }, [post, form]);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={disabledFields}
    >
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
                <field.TextField
                  label="Title"
                  placeholder="Hello world"
                  disabled={disabledFields}
                />
              )}
            </form.AppField>
            <form.AppField name="content">
              {(field) => (
                <field.TextArea
                  label="Content"
                  placeholder="Content here"
                  disabled={disabledFields}
                />
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
