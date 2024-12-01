import ky from 'ky'
import { cookies } from 'next/headers'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        // let cookieStore: CookiesFn | undefined
        // if (typeof window === 'undefined') {
        //   const { cookies: serverCookies } = await import('next/headers')

        //   cookieStore = serverCookies
        // }

        // const token = getCookie('treino-token', { cookies: cookieStore })
        const token = (await cookies()).get('treino-token')?.value

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})

export const cloudinaryAPI = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_CLOUDINARY,
})
