'use client'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {useAppSelector} from "@/redux/hooks";
import {selectToken} from "@/redux/feature/auth/authSlice";

export function middleware(request: NextRequest) {
	console.log("========| Middleware Running |========");
	console.log("=> Request URL: ", request.url);
	console.log("=> Request Method: ", request.method);
	// console.log("=> Request Headers: ", request.headers)
	const cookies = request.cookies;
	let session = cookies.get("authjs.session-token");
	const refreshToken = cookies.get("istad-refresh-token");

	// console.log("Refresh values: ", refreshToken);

	if (session === undefined){
		session = refreshToken;
	}

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url).toString());
	}
}
// multiple middleware
export const config = {
	matcher: ["/my-shop"],
};