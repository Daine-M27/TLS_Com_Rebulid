import { SignJWT, jwtVerify } from "jose";

export async function sign(payload, secret) {
  // console.log(payload);
  const issuedAt = Math.floor(Date.now() / 1000)
  const exp = issuedAt + 60 * 60 * 24 * 7 // seven days
  const encoder = new TextEncoder()

  return new SignJWT({...payload})
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setExpirationTime(exp)
    .setIssuedAt(issuedAt)
    .setNotBefore(issuedAt)
    .sign(encoder.encode(secret))
}


export async function verify(token, secret) {
  const encoder = new TextEncoder()
  const { payload } = await jwtVerify(token, encoder.encode(secret))

  return payload
}