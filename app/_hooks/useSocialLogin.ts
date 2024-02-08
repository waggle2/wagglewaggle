type ISnsName = 'kakao' | 'naver' | 'google'

export default function useSocialLogin() {
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`

  const clientID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const stateString = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
  const callbackUrl = process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientID}&response_type=code&redirect_uri=${callbackUrl}&state=${stateString}`

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const googleRedirectUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`

  const loginHandler = (snsName: ISnsName) => {
    switch (snsName) {
      case 'kakao':
        window.location.href = kakaoAuthUrl
        break
      case 'naver':
        window.location.href = naverAuthUrl
        break
      case 'google':
        window.location.href = googleAuthUrl
        break
      default:
        break
    }
  }
  return { loginHandler }
}
