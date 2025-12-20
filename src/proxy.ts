import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve session from next-auth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isVerified = token?.verified; 

  // Public routes
  const authRoutes = ["/sign-in", "/sign-up"];
  const verifyRoute = "/verify-user";

  // =============== 🟦 User NOT signed in =================
  if (!isAuth) {
    // Redirect to /sign-in if trying to access protected pages
    if (!authRoutes.includes(pathname)) {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // =============== 🟩 User IS signed in =================

  // Block access to /sign-in or /sign-up when signed in
  if (authRoutes.includes(pathname)) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Block access to /verify-user if user is already verified
  if (pathname.startsWith(verifyRoute) && isVerified) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Redirect to /verify-user if user is signed in but not verified
  if (!isVerified && pathname !== verifyRoute) {
    const verifyUrl = new URL("verify-user", req.url);
    return NextResponse.redirect(verifyUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except public assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
