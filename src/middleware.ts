import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = await fetch('https://www.wagglewaggle.site/api/v1/users')
  const data = await response.json()
  console.log('hi middleware')
  return console.log('wow', data)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
