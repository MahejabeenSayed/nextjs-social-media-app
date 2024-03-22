"use client";

import useSWR from "swr";
import Form from "./from";
import PostContainer from "@/app/component/post/post-container";

export default function Profile() {
  const { data, isLoading, error } = useSWR("/api/users/profile");

  if (error) return <div>Error</div>;

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="">
      <Form />
      <PostContainer username={data.data.username} />
    </div>
  );
}
