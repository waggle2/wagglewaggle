import Logo2 from '/public/assets/logo2.svg'
import style from '../styles/logoAndText.module.scss'
export default function LogoAndText() {
  return (
    <div className={style.headerDiv}>
      <span className={style.logoTextSpan}>
        <Logo2 width={151} height={92} />
      </span>
      <span className={style.subTitle}>성향으로 시작하는 이야기</span>
    </div>
  )
}
