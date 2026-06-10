import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Bearer-token protected endpoint for the admin dashboard to invalidate the
 * ISR cache after a content change. Without it, the public site only refreshes
 * once per hour. Token is shared via the REVALIDATE_TOKEN env var on both
 * projects.
 *
 * Body: { paths?: string[] }  // default: all top-level routes
 */

const DEFAULT_PATHS = ["/", "/about", "/services", "/companies", "/news", "/contact"];

export async function POST(request: Request) {
  const token = process.env.REVALIDATE_TOKEN;
  const auth = request.headers.get("authorization") ?? "";
  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] = DEFAULT_PATHS;
  try {
    const body = (await request.json().catch(() => ({}))) as { paths?: string[] };
    if (Array.isArray(body.paths) && body.paths.length > 0) {
      paths = body.paths.filter((p) => typeof p === "string" && p.startsWith("/"));
    }
  } catch {
    // ignore — use defaults
  }

  paths.forEach((p) => revalidatePath(p));
  return NextResponse.json({ revalidated: paths, at: new Date().toISOString() });
}

// Allow GET as a no-op health probe (no token required) — returns 405 if posted
// to with wrong content; keep semantics tight.
export function GET() {
  return NextResponse.json({ ok: true, hint: "POST with Bearer token to revalidate" });
}
