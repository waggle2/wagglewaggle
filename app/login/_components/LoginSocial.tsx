import Image from 'next/image'
import style from './styles/loginSocial.module.scss'

const iconUrl = ['/iconKakao.svg', '/iconNaver.svg', '/iconGoogle.svg']

export default function LoginSocial() {
  return (
    <div className={style.socialDiv}>
      {iconUrl.map((url, index) => (
        <span className={style.socialSpan}>
          <Image
            key={index}
            src={iconUrl[index]}
            width={48}
            height={48}
            alt="social login icon"
          />
        </span>
      ))}
    </div>
  )
}
