import style from './styles/loginSocial.module.scss'
import Kakao from '/public/assets/kakao.svg'
import Google from '/public/assets/google.svg'
import Naver from '/public/assets/naver.svg'

export default function LoginSocial() {
  return (
    <div className={style.socialDiv}>
      <Kakao height={48} width={48} />
      <Google height={48} width={48} />
      <Naver height={48} width={48} />
    </div>
  )
}
