"use client";

"use client";
import Post from "@/app/component/post";
import { PostInt } from "@/app/types";
import useSWR from "swr";

export default function FeedList({ index }: { index: number }) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

  if (error) return <div>Error</div>;

  if (isLoading) return <div>...Loading</div>;

  return (
    <div>
      {data.data &&
        data.data.length > 0 &&
        data.data.map((post: PostInt) => {
          return <Post feed={post} />;
        })}
    </div>
  );
}
