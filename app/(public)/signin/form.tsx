"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/feed");
    } else {
      alert("Cannot login");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-800 text-white gap-2 max-w-xs w-full p-5 item-center rounded-lg"
      >
        <div className="text-center">
          <h3 className="font-semibold">Sign In</h3>
        </div>

        <div className="py-3">
          <hr />
        </div>
        <div>
          <div className="flex flex-col gap-3 py-2">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-lg p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-3 py-2">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg p-2 text-black"
            />
          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              className="bg-slate-400 py-2 font-semibold px-4 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
