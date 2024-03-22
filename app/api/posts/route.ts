import { getJWTToken } from "@/app/util/helper";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const jwtPayload = await getJWTToken();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
  const limit = 3;
  const offset = page * 3;

  const statement = `select p.*, u.avatar, u.username
    from posts p inner join users u
    on p.user_id = u.id where user_id = $1
    order by created_at desc limit $2 offset $3`;

  if (username) {
    const userRes = await sql("select * from users where username = $1", [
      username,
    ]);
    if (userRes.rowCount == 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    const user = userRes.rows[0];
    const postsRes = await sql(statement, [user.id, limit, offset]);
    return NextResponse.json({ data: postsRes.rows });
  }

  const res = await sql(statement, [jwtPayload.sub, limit, offset]);

  return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
  const { content } = await request.json();

  const jwtToken = await getJWTToken();

  const res = await sql(
    `insert into posts (content , user_id) values ($1,$2)`,
    [content, jwtToken.sub]
  );

  if (res.rowCount && res.rowCount > 0) {
    return NextResponse.json({ msg: "Post added successfully" });
  }

  return NextResponse.json({ msg: "Internal server Error" }, { status: 500 });
}
