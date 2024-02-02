'use client'

import Button from '@/app/_components/button/Button'
import style from '../styles/registerEmail.module.scss'
import AccountForm from './AccountForm'
import { Dispatch, SetStateAction, useState } from 'react'
import { IInputValues } from '@/app/_lib/validate'

interface Props {
  userTotalDatas: IInputValues
  setUserTotalDatas: Dispatch<SetStateAction<any>>
  nextStep: () => void
}

export default function RegisterEmail({
  nextStep,
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  return (
    <>
      <h2 className={style.title}>
        와글와글의 새 친구로 <br />
        변신 중이에요
      </h2>
      <div className={style.formDiv}>
        <AccountForm
          userTotalDatas={userTotalDatas}
          setUserTotalDatas={setUserTotalDatas}
          nextStep={nextStep}
        />
      </div>

      <p className={style.description}>
        다음단계로 진행하면 와글와글 <span>이용약관</span> 및
        <span>개인정보처리방침</span>에 동의하게 됩니다.
      </p>
    </>
  )
}
