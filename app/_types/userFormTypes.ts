import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'

export interface SignUpData {
  authenticationProvider: 'email' | 'google' | 'kakao' | 'naver'
  socialId?: string
  email?: string
  password?: string
  nickname: string
  birthYear: number
  gender: '남성' | '여성'
  primaryAnimal: '곰돌이' | '폭스' | '댕댕이' | '고냥이'
}

export interface SignUpResponse {
  data: string
}

export interface IInputFileds {
  email?: string
  emailCheck?: string
  isEmailChecked?: string
  password?: string
  passwordCheck?: string
  nickname?: string
  isNicknameChecked?: string
  birthYear?: string
  gender?: '남성' | '여성' | ''
  loginEmail?: string
  loginPassword?: string
  socialId?: string
}

export interface IErrors {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
  birthYear?: string
  gender?: 'man' | 'woman' | ''
  loginPassword?: string
}

export type IInput = {
  type: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder?: string
  maxLength?: number
  tabIndex?: number
  disabled?: boolean
}

export type IButton = {
  text: string
  onClick: () => void
  active: boolean
  inactive: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

export type ILogin = {
  email: string
  password: string
}

export type IResetPassword = {
  email: string
  newPassword: string
}

export type IEmailCheck = {
  email: string
  emailCheckNumber: string
}

export type IEmailConfirmResponse = {
  data: {
    verified: boolean
  }
}
export type ISocialLoginResponse = {
  code: number
  message: string
  data: {
    socialId: string
    nickname: string
  }
}

export type IFormProps = {
  inputFields: IInputFileds
  setInputFields: Dispatch<SetStateAction<IInputFileds>>
  errors: IInputFileds
  setErrors: Dispatch<SetStateAction<any>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}
