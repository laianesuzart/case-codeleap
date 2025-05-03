import DeleteIcon from "@/assets/delete-icon.svg?react";
import MenuIcon from "@/assets/dots-icon.svg?react";
import EditIcon from "@/assets/edit-icon.svg?react";
import { useServerTimeContext } from "@/hooks/ServerTimeContext";
import type { Post } from "@/types";
import clsx from "clsx";
import dayjs from "dayjs";
import { memo } from "react";
import Popover from "../widgets/Popover";

interface Props {
  post: Post;
  isOwnerUser: boolean;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const formatRelativeTime = (createdAt: string, referenceTime: number) => {
  const normalizedCreatedAt = createdAt.replace(/(\.\d{3})\d+Z$/, "$1Z");
  const createdDate = dayjs(normalizedCreatedAt);
  const referenceDate = dayjs(referenceTime);
  const secondsDifference = createdDate.diff(referenceDate, "second");

  return secondsDifference >= 3 ? "just now" : createdDate.from(referenceDate);
};

function FeedPost({ post, isOwnerUser, onEdit, onDelete }: Props) {
  const serverNow = useServerTimeContext();

  return (
    <article className="wrap-anywhere">
      <header className="bg-primary p-4 md:p-6 flex justify-between items-center rounded-t-2xl">
        <h2 className="highlighted-text text-white">{post.title}</h2>
        {isOwnerUser && (
          <>
            <div className="hidden md:flex gap-6 self-start">
              <button
                type="button"
                title="Delete"
                onClick={() => onDelete(post)}
                className="text-white cursor-pointer hover:opacity-80"
              >
                <DeleteIcon />
              </button>
              <button
                type="button"
                title="Edit"
                onClick={() => onEdit(post)}
                className="text-white cursor-pointer hover:opacity-80"
              >
                <EditIcon />
              </button>
            </div>

            <Popover
              className="md:hidden"
              content={
                <ul id="actions-menu" className="shadow-lg rounded-lg">
                  <li>
                    <button
                      type="button"
                      onClick={() => onDelete(post)}
                      className="cursor-pointer hover:text-primary py-2 pl-3 pr-4 flex gap-2 items-center border-b-1 border-solid border-[#ccc]"
                    >
                      <DeleteIcon width={24} />
                      Delete
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onEdit(post)}
                      className="cursor-pointer hover:text-primary py-2 pl-3 pr-4 flex gap-2 items-center"
                    >
                      <EditIcon width={24} /> Edit
                    </button>
                  </li>
                </ul>
              }
            >
              <MenuIcon className="text-white" />
            </Popover>
          </>
        )}
      </header>

      <section className="p-6 grid gap-4 md:text-lg border-1 border-solid border-[#999] border-t-0 rounded-b-2xl">
        <div className="flex flex-wrap justify-between text-[#777]">
          <span aria-label="author" className="font-bold">
            &#64;{post.username}
          </span>
          <time
            dateTime={post.created_datetime}
            className={clsx(
              !serverNow && "animate-pulse w-1/5 bg-gray-200 h-4 rounded",
            )}
          >
            {serverNow
              ? formatRelativeTime(post.created_datetime, serverNow)
              : null}
          </time>
        </div>
        <p className="leading-tight whitespace-pre-line">{post.content}</p>
      </section>
    </article>
  );
}

export default memo(FeedPost);
