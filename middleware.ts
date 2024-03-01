import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authorizedUrls = [pathname.startsWith("/api/users")];

  if (authorizedUrls.includes(true)) {
    const jwtToken = request.cookies.get("jwt-token");

    if (!jwtToken || !jwtToken.value) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.POSTGRES_JWT_SECRET!);
      await jwtVerify(jwtToken.value, secret);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Internal server Error" },
        { status: 500 }
      );
    }
  }
}

export const config = {
  matcher: "/:path*",
};
