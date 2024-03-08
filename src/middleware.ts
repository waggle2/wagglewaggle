import type { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  const cookie = response
  console.log(cookie, 'cookie')
  return console.log('wow')
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
