import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getJWTToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt-token");

  const secret = new TextEncoder().encode(process.env.POSTGRES_JWT_SECRET);
  const { payload } = await jwtVerify(token?.value!, secret);
  return payload;
}
