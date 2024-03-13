"use client";

import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import User from "./user";

export default function Header() {
  const { data, isLoading, error } = useSWR("/api/users/profile");

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <header className="flex flex-row flex-space-between bg-slate-800 rounded-lg p-5 items-center text-white w-full justify-between">
      <div>My App</div>
      <div>
        <User user={data?.data} />
      </div>
    </header>
  );
}
