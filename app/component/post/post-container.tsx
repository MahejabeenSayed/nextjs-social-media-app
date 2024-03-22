"use client";

import { useState } from "react";
import PostList from "./post-list";

export default function PostContainer({ username }: { username: string }) {
  const pages = [];
  const [count, setCount] = useState(0);

  for (let i = 0; i <= count; i++) {
    pages.push(<PostList username={username} index={i} key={i} />);
  }
  return (
    <>
      {pages}
      <div className="text-center">
        <button
          className="bg-slate-400 p-2 rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Load More
        </button>
      </div>
    </>
  );
}
