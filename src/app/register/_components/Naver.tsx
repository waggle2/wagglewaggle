import style from '../styles/Kakao.module.scss'
export const KakaoLogin = () => {
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY

  const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`

  const kakaoLoginHandler = () => {
    window.location.href = kakaoAuthUrl
  }

  return { kakaoLoginHandler }
}
