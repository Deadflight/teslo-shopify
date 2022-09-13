import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
// 	if (req.nextUrl.pathname.startsWith("/checkout")) {
// 		console.log(req);
// 	}
// 	// return NextResponse.redirect(new URL("/about-2", request.url));
// 	return NextResponse.next();
// }

export const config = { matcher: ["/checkout/:path*"] };
