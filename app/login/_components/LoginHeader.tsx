import Logo2 from '/public/assets/logo2.svg'
import style from './styles/loginHeader.module.scss'

export default function LoginHeader() {
  return (
    <>
      <div className={style.headerDiv}>
        <span className={style.logoTextSpan}>
          <Logo2 height={84} width={138} />
        </span>
        <span>성향으로 시작하는 이야기</span>
      </div>
    </>
  )
}
