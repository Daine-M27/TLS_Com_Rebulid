import { NextResponse } from "next/server";

import { verify } from "./lib/token";

const secret = process.env.TOKEN_SECRET;

export async function middleware(request) {

  const tls = request.cookies.get('theLightSource');
  // console.log(tls, 'middleware');

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (tls === undefined) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url);
    }

    try {
      const user = await verify(tls, secret);
      // console.log(user);
      const url = request.nextUrl.clone()
      url.pathname = `/dealerZone/${user.id}`
      return NextResponse.redirect(url)
    } catch (error) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url);
    }
  }

  //return NextResponse.next();
}

// export const config = {
//   matcher: ['/dealerZone/:userId*', '/api/users']
// }