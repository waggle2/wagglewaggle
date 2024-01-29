'use client'
import Image from 'next/image'
import style from './styles/loginForm.module.scss'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import { useState } from 'react'
import Button from '@/app/_components/button/Button'

export default function LoginForm() {
  const [passwordView, setPasswordView] = useState(false)
  const [isTypedAll, setIsTypedAll] = useState(false)
  const [isRightEmail, setIsRightEmail] = useState(false)
  const [isRightPassword, setIsRightPassword] = useState(false)
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
      <div className={style.buttonWrapper}>
        {isRightEmail ? (
          <Button mainColor="green" text="로그인 하기" />
        ) : (
          <Button
            mainColor="red"
            text="존재하지 않는 이메일입니다"
            isDisabled={true}
          />
        )}
        {isTypedAll ? (
          <Button mainColor="green" text="로그인 하기" />
        ) : (
          <Button mainColor="grey" text="로그인 하기" />
        )}
      </div>
    </form>
  )
}
