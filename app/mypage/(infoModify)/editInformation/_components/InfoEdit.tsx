'use client'

import Button from '@/app/_components/button/Button'
import Modal from '@/app/_components/common/modal/Modal'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import InputText, { DisabledText } from '../../_components/InputText'

import style from './infoEdit.module.scss'

export default function InfoEdit() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [modalView, setModalView] = useState(false)

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value)
    isValidCheckPassword(e.target.value)
  }
  const handleChangeValidPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValidPassword(() => e.target.value)
    isValidPassword(e.target.value)
  }
  const isValidPassword = (target: string) => {
    if (target === password) {
      setIsValid(() => true)
    } else if (validPassword.length === 0) {
      setIsValid(() => false)
    } else {
      setIsValid(() => false)
    }
  }
  const isValidCheckPassword = (target: string) => {
    if (target === validPassword) {
      setIsValid(() => true)
    } else if (validPassword.length === 0) {
      setIsValid(() => false)
    } else {
      setIsValid(() => false)
    }
  }

  return (
    <div className={style.container}>
      <DisabledText text={'test@test.com'} title={'이메일'} />
      <DisabledText text={'2002 / 여자'} title={'성별'} />
      <InputText
        title="새로운 비밀번호"
        placeholder={'새로운 비밀번호를 입력해주세요'}
        text={password}
        type="password"
        onChange={handleChangePassword}
        warning={'비밀번호 유효성 문자 여기'}
      />
      <InputText
        title="새로운 비밀번호 확인"
        placeholder={'새로운 비밀번호를 입력해주세요'}
        text={validPassword}
        type="password"
        onChange={handleChangeValidPassword}
        warning={'새로운 비밀번호와 일치하지 않습니다.'}
      />
      {isValid ? (
        <Button
          text={'변경하기'}
          mainColor={'green'}
          action={() => {
            setModalView(true)
          }}
        />
      ) : (
        <Button text={'변경하기'} mainColor={'grey'} />
      )}
      {modalView && (
        <Modal
          title={'변경 완료'}
          content={'회원 정보가 수정되었습니다'}
          buttons={[
            <Button
              text={'확인'}
              mainColor={'green'}
              key={'success'}
              action={() => {
                setModalView(false)
                router.replace('/mypage')
              }}
            />,
          ]}
        />
      )}
    </div>
  )
}
