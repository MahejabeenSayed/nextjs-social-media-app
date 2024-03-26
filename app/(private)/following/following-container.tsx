"use client";

import { useState } from "react";
import FollowingList from "./following-list";

export default function FollowingContainer() {
  const [page, setPage] = useState(0);
  const pages = [];

  for (let i = 0; i <= page; i++) {
    pages.push(<FollowingList index={i} key={i} />);
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
