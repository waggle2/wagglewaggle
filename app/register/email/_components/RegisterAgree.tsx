'use client'
import Button from '@/app/_components/button/Button'
import style from '../styles/registerAgree.module.scss'
import { useRouter } from 'next/navigation'
import Check from '/public/assets/check.svg'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  IErrors,
  IInputFileds,
  SignUpData,
} from '@/app/_types/userRegisterTypes'
import { useSignUpUser } from '@/app/_hooks/services/mutations/userRegister'

interface Props {
  inputFields: IInputFileds
  errors: IErrors
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  passable: boolean
}

export default function RegisterAgree({ inputFields }: Props) {
  const router = useRouter()
  const [agree1, setAgree1] = useState(false)
  const [agree2, setAgree2] = useState(false)
  const mutation = useSignUpUser()
  const sendTotalDatas = async () => {
    try {
      const { email, password, nickname, birthYear, gender } = inputFields
      const DEFAULT_BIRTH_YEAR = 1990
      if (!(email && password && nickname && birthYear && gender))
        throw new Error('필수 항목을 입력해주세요')
      const body: SignUpData = {
        authenticationProvider: 'email',
        email,
        password,
        nickname,
        birthYear: Number(birthYear) ?? DEFAULT_BIRTH_YEAR,
        gender,
        primaryAnimal: '곰',
      }
      mutation.mutate(body)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  return (
    <div>
      <h2 className={style.title}>
        와글와글을 시작하기 위해
        <br />
        약관에 동의해주세요
      </h2>
      <div className={style.areaDiv}>
        <span className={style.iconSpan} onClick={() => setAgree1(!agree1)}>
          <Check color={agree1 ? '#2FD714' : '#8C8C8C'} />
        </span>
        <span className={style.subTitle}>
          이용약관 <span className={style.accent}>(필수)</span>
        </span>
        <label>
          <textarea
            cols={30}
            rows={6}
            readOnly
            value="이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고
            6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로
            스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤이용약관
            어쩌고저쩌고 6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지
            노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤
            이용약관 어쩌고저"
          />
        </label>
      </div>
      <div className={style.areaDiv}>
        <span className={style.iconSpan} onClick={() => setAgree2(!agree2)}>
          <Check color={agree2 ? '#2FD714' : '#8C8C8C'} />
        </span>
        <span className={style.subTitle}>
          이용약관 <span className={style.accent}>(필수)</span>
        </span>
        <label>
          <textarea
            cols={30}
            rows={6}
            readOnly
            value="이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고
            6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로
            스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤이용약관
            어쩌고저쩌고 6줄까지 노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지
            노출 이후로 스크롤 이용약관 어쩌고저쩌고 6줄까지 노출 이후로 스크롤
            이용약관 어쩌고저"
          />
        </label>
      </div>
      <div className={style.buttonDiv}>
        <Button
          mainColor={agree1 && agree2 ? 'green' : 'grey'}
          text="회원가입 완료"
          isDisabled={!(agree1 && agree2)}
          action={() => {
            sendTotalDatas()
            router.push('/')
          }}
        />
      </div>
    </div>
  )
}
