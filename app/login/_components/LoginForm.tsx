'use client'
import Image from 'next/image'
import style from './styles/loginForm.module.scss'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import { useState } from 'react'

export default function LoginForm() {
  const [passwordView, setPasswordView] = useState(false)

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
          {passwordView ? (
            <View2
              onClick={() => setPasswordView(!passwordView)}
              width={20}
              height={20}
            />
          ) : (
            <NotView
              onClick={() => setPasswordView(!passwordView)}
              width={20}
              height={20}
            />
          )}
        </label>
      </div>
      <button className={style.loginButton}>로그인 하기</button>
    </form>
  )
}
