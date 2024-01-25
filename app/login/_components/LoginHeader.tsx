import Image from 'next/image'
import style from './styles/loginHeader.module.scss'

export default function LoginHeader() {
  return (
    <>
      <div className={style.headerDiv}>
        <span>
          <Image src="/logoLogin.svg" alt="logo" width={55.79} height={37.23} />
        </span>
        <span className={style.logoTextSpan}>
          <Image
            src="/logoTextLogin.svg"
            alt="logo"
            width={137.99}
            height={34.9}
          />
        </span>
        <span>성향으로 시작하는 이야기</span>
      </div>
    </>
  )
}
