import { getJWTToken } from "@/app/util/helper";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // get user token
  const token = await getJWTToken();

  // fetch user
  const res = await sql("select * from users where id = $1", [token.sub]);

  const user = res.rows[0];
  // send response

  return NextResponse.json({ data: user });
}
