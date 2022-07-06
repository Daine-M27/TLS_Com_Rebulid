import { NextResponse } from "next/server";

import { verify } from "./lib/token";

const secret = process.env.TOKEN_SECRET;

export function middleware(request) {

  const tls = request.cookies.get('theLightSource');
  // console.log(tls, 'middleware');

  if (request.nextUrl.pathname.startsWith("/dealerZone")) {
    if (tls === undefined) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url);
    }

    try {
      verify(tls, secret);
      return NextResponse.next();
    } catch (error) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: '/dealerZone/:user*',
// }