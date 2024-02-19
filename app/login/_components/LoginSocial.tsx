'use client'
import style from './styles/loginSocial.module.scss'
import Kakao from '/public/assets/kakao.svg'
import Google from '/public/assets/google.svg'
import Naver from '/public/assets/naver.svg'
import useSocialLogin from '@/app/_hooks/useSocialLogin'
import { useRecoilState } from 'recoil'
import { AtomNaverState } from '@/app/_recoil/atoms/socialLogin'
import { useEffect } from 'react'

export default function LoginSocial() {
  const { signUpButtonList, randomString } = useSocialLogin()
  const [, setNaverState] = useRecoilState(AtomNaverState)

  useEffect(() => {
    setNaverState(randomString)
  }, [])

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
