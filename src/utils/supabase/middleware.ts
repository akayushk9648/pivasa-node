import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";

export async function updateSession(request: NextRequest) {
  const adminCookie = request.cookies.get("pivasa_admin_session")?.value;
  
  // Verify tamper-proof HMAC cryptographic session token
  const validAdminSession = await verifySessionToken(adminCookie);
  const hasValidCookieSession = !!validAdminSession;

  let hasSupabaseUser = false;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (supabaseUrl && supabaseAnonKey && supabaseAnonKey !== "placeholder-anon-key") {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({
                name,
                value,
                ...options,
              });
              supabaseResponse = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              supabaseResponse.cookies.set({
                name,
                value,
                ...options,
              });
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({
                name,
                value: "",
                ...options,
              });
              supabaseResponse = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              supabaseResponse.cookies.set({
                name,
                value: "",
                ...options,
              });
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        hasSupabaseUser = true;
      }
    } catch (e) {
      // Supabase auth fallback
    }
  }

  const isAuthenticated = hasValidCookieSession || hasSupabaseUser;

  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from /login
  if (request.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return supabaseResponse;
}
