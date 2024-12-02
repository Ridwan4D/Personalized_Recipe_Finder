import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token");
  const { pathname } = req.nextUrl;
  if (pathname.includes("api")) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-favorite", "/services/:path*"],
};
