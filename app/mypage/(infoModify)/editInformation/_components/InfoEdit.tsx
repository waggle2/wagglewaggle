'use client'

import { userResponseData, credential } from '@/app/mypage/_types/userData'
import api from '@/app/_api/commonApi'
import Button from '@/app/_components/button/Button'
import Modal from '@/app/_components/common/modal/Modal'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import InputText, { DisabledText } from '../../_components/InputText'

import style from './infoEdit.module.scss'

export default function InfoEdit() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [waringMessage, setWaringMessage] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isAuthPassword, setIsAuthPassword] = useState(false)
  const [successModalView, setSuccessModalView] = useState(false)
  const [userInfo, setUserInfo] = useState<userResponseData>()
  const [userCredential, setUserCredential] = useState<credential>()
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=|\\{}[\]:;<>,.?/~]).{8,16}$/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users')
        const userData = res.data
        console.log(res.data, 'mypage')
        setUserInfo(() => userData)
        setUserCredential(() => userData.credential)
        //undefined
      } catch (e) {
        console.error(e, 'mypageError')
      }
    }
    fetchData()
  }, [])
  const userVerified = () => {
    console.log('TODO: 인증 이벤트 추가')
  }
  const handleChangeCurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(() => e.target.value)
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(() => e.target.value)
    isValidCheckPassword(e.target.value)
  }
  const handleChangeValidPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValidPassword(() => e.target.value)
    isValidPassword(e.target.value)
  }

  const isValidPassword = (target: string) => {
    if (target === newPassword) {
      setIsValid(() => true)
      setWaringMessage(() => '')
    } else if (validPassword.length === 0) {
      setIsValid(() => false)
    } else {
      setIsValid(() => false)
      setWaringMessage(() => '비밀번호가 일치하지 않습니다')
    }
  }
  const isValidCheckPassword = (target: string) => {
    if (target === validPassword) {
      setIsValid(() => true)
      setWaringMessage(() => '')
    } else if (validPassword.length === 0) {
      setIsValid(() => false)
    } else {
      setIsValid(() => false)
      setWaringMessage(() => '비밀번호가 일치하지 않습니다')
    }
  }

  const handleSuccess = () => {
    router.replace('/mypage')
  }
  const handlePasswordChangeRequest = () => {
    if (isAuthPassword === false) {
      setIsValid(() => false)
      setWaringMessage(() => '비밀번호 인증을 해주세요 ')
    }
    regex.test(newPassword)
      ? () => {
          try {
            api.patch('/authentication', {
              password: currentPassword,
              newPassword,
            })
          } catch (error) {}
        }
      : setWaringMessage(
          () =>
            '비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요. ',
        )
  }
  return (
    <div className={style.container}>
      <DisabledText
        text={
          userInfo?.socialId
            ? `(${userInfo.authenticationProvider}) 가입 회원입니다.`
            : userCredential?.email
        }
        title={'이메일'}
      />

      <DisabledText
        text={
          userCredential &&
          userCredential?.birthYear + ' / ' + userCredential?.gender
        }
        title={'성별'}
        button={true}
        onClick={userInfo?.isVerified ? undefined : userVerified}
      />

      {userInfo?.authenticationProvider === 'email' && (
        <>
          <InputText
            title="현재 비밀번호"
            placeholder={'현재 비밀번호를 입력해주세요'}
            text={currentPassword}
            type="password"
            onChange={handleChangeCurrentPassword}
          />
          <InputText
            title="새로운 비밀번호"
            placeholder={'새로운 비밀번호를 입력해주세요'}
            text={newPassword}
            type="password"
            onChange={handleChangePassword}
            guide={'8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.'}
          />
          <InputText
            title="새로운 비밀번호 확인"
            placeholder={'새로운 비밀번호를 입력해주세요'}
            text={validPassword}
            type="password"
            onChange={handleChangeValidPassword}
            warning={waringMessage}
          />
          {isValid && isAuthPassword ? (
            <Button
              text={'변경하기'}
              mainColor={'green'}
              action={handlePasswordChangeRequest}
            />
          ) : (
            <Button text={'변경하기'} mainColor={'grey'} />
          )}
        </>
      )}

      {successModalView && (
        <Modal
          title={'변경 완료'}
          content={'회원 정보가 수정되었습니다'}
          buttons={[
            <Button
              text={'확인'}
              mainColor={'green'}
              key={'success'}
              action={handleSuccess}
            />,
          ]}
        />
      )}
    </div>
  )
}
