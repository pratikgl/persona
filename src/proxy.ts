import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const handler = auth((req) => {
  const isAuthed = !!req.auth;
  const isAppRoute = req.nextUrl.pathname.startsWith("/app");
  const isAuthRoute =
    req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";

  if (isAppRoute && !isAuthed) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthRoute && isAuthed) {
    return NextResponse.redirect(new URL("/app/home", req.nextUrl));
  }

  return NextResponse.next();
});

export { handler as proxy };

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"],
};
