"use client";

import useSWR from "swr";

export default function Header() {
  const { data, isLoading, error } = useSWR("/api/users/profile");

  console.log(error, " ----------------------------");

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return <header>{data.data.username}</header>;
}
