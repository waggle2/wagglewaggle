import Image from 'next/image'
import style from './styles/loginForm.module.scss'

export default function LoginForm() {
  return (
    <form className={style.loginForm}>
      <div className={style.inputDiv}>
        <label>
          <input type="text" placeholder="이메일을 입력해주세요" />
        </label>
      </div>
      <div className={style.inputDiv}>
        <label className={style.passwordLabel}>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <Image
            src="/iconPasswordVisible.svg"
            alt="eye"
            width={20}
            height={20}
          />
        </label>
      </div>
      <button className={style.loginButton}>로그인 하기</button>
    </form>
  )
}
