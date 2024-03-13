import Image from "next/image";
import { User } from "../types";
import Link from "next/link";

export default function User({ user }: { user: User }) {
  return (
    <>
      {user && (
        <Link href={"/accounts"}>
          <div className="flex flex-row justify-between gap-2 items-center">
            <div className="rounded-full bg-slate-500">
              {user.avatar && (
                <Image
                  src={user?.avatar}
                  alt={user.username}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
            <span>{user?.username}</span>
          </div>
        </Link>
      )}
    </>
  );
}
