import { getJWTToken } from "@/app/util/helper";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 3;

  const offset = page * limit;

  const res = await sql(
    `select id, username,avatar from users u inner join follows f
   on f.user_id = u.id where follower_id = $1
   limit $2 offset $3`,
    [params.id, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
