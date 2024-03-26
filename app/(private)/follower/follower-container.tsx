"use client";

import { useState } from "react";
import FollowerList from "./follower-list";

export default function FollowerContainer() {
  const [page, setPage] = useState(0);
  const pages = [];

  for (let i = 0; i <= page; i++) {
    pages.push(<FollowerList index={i} key={i} />);
  }

  return (
    <div className="">
      {pages}
      <div className="flex justify-center mb-2">
        <button
          className="bg-slate-400 p-2 rounded-lg"
          onClick={() => setPage(page + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
