'use client'

import style from './verifyPassword.module.scss'

import InputText from '../../_components/InputText'
import { ChangeEvent, useState } from 'react'
import Button from '@/app/_components/button/Button'

type props = {
  onClick: () => void
}

export default function VerifyPassword({ onClick }: props) {
  const [password, setPassword] = useState('')
  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value)
  }
  return (
    <div className={style.container}>
      <InputText
        placeholder={'본인확인을 위해 현재 비밀번호를 입력해주세요'}
        text={password}
        onChange={handleChangeNickName}
        type="password"
        title="비밀번호 확인"
      />

      <Button text={'다음'} mainColor={'green'} action={onClick} />
    </div>
  )
}
