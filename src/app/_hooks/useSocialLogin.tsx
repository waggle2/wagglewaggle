'use client'

import { useRouter } from 'next/navigation'

type ISnsName = 'kakao' | 'naver' | 'google'

export default function useSocialLogin(randomString: string) {
  const router = useRouter()
  const signUpButtonList = [
    {
      class: 'kakao',
      name: '카카오로 가입하기',
      clickEvent: () => loginHandler('kakao'),
    },
    {
      class: 'naver',
      name: '네이버로 가입하기',
      clickEvent: () => loginHandler('naver'),
    },
    {
      class: 'google',
      name: '구글로 가입하기',
      clickEvent: () => loginHandler('google'),
    },
    {
      class: 'email',
      name: '이메일로 가입하기',
      clickEvent: () => router.push('/register/email'),
    },
  ]
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`

  const clientID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  // const stateString = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
  const callbackUrl = process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientID}&response_type=code&redirect_uri=${callbackUrl}&state=${randomString}`

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const googleRedirectUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`

  const loginHandler = (snsName: ISnsName) => {
    switch (snsName) {
      case 'kakao':
        router.push(kakaoAuthUrl)
        break
      case 'naver':
        router.push(naverAuthUrl)
        break
      case 'google':
        router.push(googleAuthUrl)
        break
      default:
        break
    }
  }
  return { signUpButtonList, randomString }
}
