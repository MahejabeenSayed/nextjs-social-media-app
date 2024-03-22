"use client";
import { PostInt } from "@/app/types";
import useSWR from "swr";
import Post from ".";

export default function PostList({
  username,
  index,
}: {
  username: string;
  index: number;
}) {
  const { data, isLoading, error } = useSWR(
    "api/posts?page=" + index + "&username=" + username
  );

  if (error) return <div>Error</div>;

  if (isLoading) return <div>...Loading</div>;

  return (
    <>
      {data.data &&
        data.data.length > 0 &&
        data.data.map((feed: PostInt) => {
          return (
            <Post feed={feed} />
            // <div key={feed.id} className="p-3 mb-3 flex flex-row gap-3">
            //   <div>
            //     <Link href={feed.username}>
            //       <div className="flex flex-row gap-2 items-center">
            //         <div
            //           className="rounded-full bg-slate-500"
            //           style={{ width: 50 }}
            //         >
            //           {feed.avatar && (
            //             <Image
            //               src={feed?.avatar}
            //               alt={feed.username}
            //               width={50}
            //               height={50}
            //               className="rounded-full"
            //             />
            //           )}
            //         </div>
            //       </div>
            //     </Link>
            //   </div>

            //   <div>
            //     <div>
            //       <span className="font-bold">
            //         <Link href={`/${feed.username}`}>{feed?.username}</Link>
            //       </span>
            //     </div>

            //     <div className="text-slate-400">
            //       <p>
            //         {new Date(feed.created_at).toLocaleDateString(
            //           "en-us",
            //           options
            //         )}
            //       </p>
            //     </div>
            //   </div>
            // </div>
          );
        })}
    </>
  );
}
