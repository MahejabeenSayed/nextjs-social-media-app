"use client";

import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

export default function Form() {
  const [content, setContent] = useState("");
  const { mutate } = useSWRConfig();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        content: content,
      }),
    });

    if (res.ok) {
      setContent("");
      mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Whats happening"
        className="bg-slate-500 w-full rounded-lg p-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        name="content"
      />
      <div>
        <button className="p-3 rounded-lg bg-slate-900" type="submit">
          Post
        </button>
      </div>
    </form>
  );
}
