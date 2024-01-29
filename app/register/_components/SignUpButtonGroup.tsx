import KaKaoSimple from '/public/assets/kakaoSimple.svg'
import GoogleSimple from '/public/assets/googleSimple.svg'
import NaverSimple from '/public/assets/naverSimple.svg'
import Email from '/public/assets/email.svg'
import cs from 'classnames/bind'
import style from '../styles/signUpButtonGroup.module.scss'
import Link from 'next/link'
const cx = cs.bind(style)

const signUpButtonList = [
  {
    class: 'kakao',
    name: '카카오로 시작하기',
    href: '',
  },
  {
    class: 'naver',
    name: '네이버로 시작하기',
    href: '',
  },
  {
    class: 'google',
    name: '구글로 시작하기',
    href: '',
  },
  {
    class: 'email',
    name: '이메일로 시작하기',
    href: '/register/email',
  },
]

export default function SignUpButtonGroup() {
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
        <Link key={index} href={button.href}>
          <div className={cx(button.class, 'buttonDiv')}>
            <span className={style.iconSpan}>{makeSignUpButton(index)}</span>
            <span className={style.textSpan}>{button.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
