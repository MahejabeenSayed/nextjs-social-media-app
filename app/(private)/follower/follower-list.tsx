"use client";

"use client";
import Post from "@/app/component/post";
import User from "@/app/component/post/user";
import { PostInt } from "@/app/types";
import useSWR from "swr";

export default function FollowerList({ index }: { index: number }) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data, error, isLoading } = useSWR(
    () => `/api/users/${userData.data.id}/follower?page=` + index
  );

  if (error) return <div>Error</div>;

  if (isLoading) return <div>...Loading</div>;

  return (
    <div>
      {data.data &&
        data.data.length > 0 &&
        data.data.map((post: PostInt) => {
          return <User user={post} />;
        })}
    </div>
  );
}
