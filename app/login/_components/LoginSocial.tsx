'use client'
import style from './styles/loginSocial.module.scss'
import Kakao from '/public/assets/kakao.svg'
import Google from '/public/assets/google.svg'
import Naver from '/public/assets/naver.svg'
import useSocialLogin from '@/app/_hooks/useSocialLogin'
import { setCookie } from 'cookies-next'

export default function LoginSocial() {
  function generateState() {
    return Math.random().toString(36).substring(2, 10)
  }
  const randomString = generateState()

  setCookie('randomString', randomString, {
    maxAge: 10,
  })

  const { signUpButtonList } = useSocialLogin(randomString)

  const makeSignUpButton = (index: number) => {
    switch (index) {
      case 0:
        return <Kakao width={48} height={48} />
      case 1:
        return <Naver width={48} height={48} />
      case 2:
        return <Google width={48} height={48} />
      default:
        return null
    }
  }
  return (
    <div className={style.socialDiv}>
      {signUpButtonList.map((button, index) => (
        <button key={index} onClick={button.clickEvent}>
          <div className={style.buttonDiv}>
            <span className={style.iconSpan}>{makeSignUpButton(index)}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
