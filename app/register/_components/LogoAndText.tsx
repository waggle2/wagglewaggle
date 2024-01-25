import Image from 'next/image'
import style from './styles/logoAndText.module.scss'
export default function LogoAndText() {
  return (
    <div className={style.headerDiv}>
      <span>
        <Image src="/logoLogin.svg" alt="logo" width={61.05} height={40.77} />
      </span>
      <span className={style.logoTextSpan}>
        <Image
          src="/logoTextLogin.svg"
          alt="logo"
          width={150.99}
          height={38.22}
        />
      </span>
      <span>성향으로 시작하는 이야기</span>
    </div>
  )
}
