import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest, res: NextResponse) {
  const user = req.cookies.get('user')?.value
  const pathname = req.nextUrl.pathname

  if (pathname.includes('/signin') && user) {
    return NextResponse.redirect(new URL('/app', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin/:path*'],
}
