import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full p-3 my-2 bg-slate-800 rounded-lg">
      <u className="flex flex-row w-full justify-between text-white no-underline list-none">
        <li className="">
          <Link
            href={"/feed"}
            className={pathname.startsWith("/feed") ? "text-green-400" : ""}
          >
            Feed
          </Link>
        </li>
        <li className="">
          <Link
            href={"/profile"}
            className={pathname.startsWith("/profile") ? "text-green-400" : ""}
          >
            Profile
          </Link>
        </li>
        <li className="">
          <Link
            href={"/follower"}
            className={pathname.startsWith("/follower") ? "text-green-400" : ""}
          >
            Followers
          </Link>
        </li>
        <li className="">
          <Link
            href={"/following"}
            className={
              pathname.startsWith("/following") ? "text-green-400" : ""
            }
          >
            Following
          </Link>
        </li>
      </u>
    </nav>
  );
}
