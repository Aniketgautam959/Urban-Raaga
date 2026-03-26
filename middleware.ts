import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginPage = createRouteMatcher(["/admin/login"]);

export default clerkMiddleware((auth, req) => {
  // Let the login page through
  if (isLoginPage(req)) return NextResponse.next();

  // Protect all other /admin routes
  if (isAdminRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
