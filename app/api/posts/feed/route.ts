import { getJWTToken } from "@/app/util/helper";
import { sql } from "@/db";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 10;

  //offset is used for pagination to leave rows behind before picking next entry
  const offset = page * 10;
  // this is to get the loggedin user details
  const jwtuser = await getJWTToken();

  const res = await sql(
    `select p.*, u.username , u.avatar from posts p
     inner join users u on p.user_id=u.id
     where p.user_id in(select user_id from follows where follower_id=$1)
     order by created_at desc limit $2 offset $3`,
    [jwtuser.sub, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
