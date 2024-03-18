import { PostInt } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

export default function Post({ feed }: { feed: PostInt }) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const created = new Date(feed.created_at);
  return (
    <div key={feed.id} className="p-3 mb-3 flex flex-row gap-3">
      <div>
        <Link href={feed.username}>
          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full bg-slate-500" style={{ width: 50 }}>
              {feed.avatar && (
                <Image
                  src={feed?.avatar}
                  alt={feed.username}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        </Link>
      </div>

      <div>
        <div>
          <span className="font-bold">
            <Link href={`/${feed.username}`}>{feed?.username}</Link>
          </span>
        </div>

        <div className="text-slate-400">
          <p>{created.toLocaleDateString("en-us", options)}</p>
        </div>

        <div className="mt-3 mb-4">
          <p>{feed.content}</p>
        </div>
      </div>
    </div>
  );
}
