import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col max-w-xs w-full p-5 rounded-lg gap-2 bg-slate-300">
        <div className="text-center my-4">My strings</div>
        <div className="p-3 my-5 rounded-lg block bg-slate-400">
          <Link href="/signin">
            Sing In
          </Link>
        </div>
 
         <div className="p-3 my-5 rounded-lg block bg-slate-400">
          <Link href="/singup">
            Sing Up
          </Link>
        </div>
      </div>
    </main>
  );
}
