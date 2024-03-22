import { getJWTToken } from "@/app/util/helper";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtToken = await getJWTToken();

  const res = await sql(`select * from posts where id = $1 and user_id = $2`, [
    params.id,
    jwtToken.sub,
  ]);

  if (res.rowCount == 0) {
    return NextResponse.json({ msg: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ data: res.rows[0] });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtToken = await getJWTToken();
  const { content } = await request.json();

  const res = await sql(`select * from posts where id = $1 and user_id = $2`, [
    params.id,
    jwtToken.sub,
  ]);

  if (res.rowCount == 0) {
    return NextResponse.json({ msg: "Post not found" }, { status: 404 });
  }

  await sql(`update posts set content = $1 where id = $2 and user_id = $3`, [
    content,
    params.id,
    jwtToken.sub,
  ]);

  return NextResponse.json({ msg: "Updated successfully" });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtToken = await getJWTToken();

  const res = await sql(`select * from posts where id = $1 and user_id = $2`, [
    params.id,
    jwtToken.sub,
  ]);

  if (res.rowCount == 0) {
    return NextResponse.json({ msg: "Post not found" }, { status: 404 });
  }

  await sql(`delete from posts where id = $1 and user_id = $2`, [
    params.id,
    jwtToken.sub,
  ]);

  return NextResponse.json({ msg: "deleted successfully" });
}
