import { sql } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await sql("select * from users where username ilike $1", [
    username,
  ]);

  if (user.rowCount && user.rowCount > 0) {
    return NextResponse.json(
      { error: "username already exists" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);

  const res = await sql(
    "insert into users (username , password) values ($1,$2)",
    [username, hash]
  );

  if (res.rowCount && res.rowCount > 0) {
    return NextResponse.json(
      { msg: "User added successfully" },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ error: "Some error" }, { status: 400 });
  }
}
