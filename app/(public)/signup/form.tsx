"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    ""
  );

  const [erros, setErrors] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);

    if (password != confirmPassword) {
      erros.push("Password does not match");
      return;
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    console.log(res);

    if (res.ok) {
      alert("signup successfull, redirecting it to signin page");

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } else {
      alert("Cannot Signup");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-800 text-white gap-2 max-w-xs w-full p-5 item-center rounded-lg"
      >
        <div className="text-center">
          <h3 className="font-semibold">Sign Up</h3>
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

          <div className="flex flex-col gap-3 py-2">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="rounded-lg p-2 text-black"
            />
          </div>

          <button
            type="submit"
            className="mt-5 bg-slate-900 py-2 font-semibold px-4 rounded-lg w-full"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
