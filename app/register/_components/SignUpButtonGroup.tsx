'use client'

import KaKaoSimple from '/public/assets/kakaoSimple.svg'
import GoogleSimple from '/public/assets/googleSimple.svg'
import NaverSimple from '/public/assets/naverSimple.svg'
import Email from '/public/assets/email.svg'
import cs from 'classnames/bind'
import style from '../styles/signUpButtonGroup.module.scss'
import useSocialLogin from '@/app/_hooks/useSocialLogin'
import { useRouter } from 'next/navigation'
const cx = cs.bind(style)

export default function SignUpButtonGroup() {
  const { loginHandler } = useSocialLogin()
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
  const makeSignUpButton = (index: number) => {
    switch (index) {
      case 0:
        return <KaKaoSimple width={24} height={24} />
      case 1:
        return <NaverSimple width={24} height={24} />
      case 2:
        return <GoogleSimple width={24} height={24} />
      case 3:
        return <Email width={24} height={24} />
      default:
        return null
    }
  }

  return (
    <div className={style.buttonsWrapper}>
      {signUpButtonList.map((button, index) => (
        <button key={index} onClick={button.clickEvent}>
          <div className={cx(button.class, 'buttonDiv')}>
            <span className={style.iconSpan}>{makeSignUpButton(index)}</span>
            <span className={style.textSpan}>{button.name}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
