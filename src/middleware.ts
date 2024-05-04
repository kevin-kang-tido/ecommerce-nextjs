import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log("========| Middleware Running |========");
	console.log("=> Request URL: ", request.url);
	console.log("=> Request Method: ", request.method);
	// console.log("=> Request Headers: ", request.headers)
	const cookies = request.cookies;
	const session = cookies.get("authjs.session-token")

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url).toString());
	}
}
// multiple middleware
export const config = {
	matcher: ["/my-shop"],
};