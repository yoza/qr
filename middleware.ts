import { NextRequest } from 'next/server';


// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
}

export default function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  let cookie = request.cookies.get('edgedb-session')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }

  if (!cookie?.value) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    )
  }
}
