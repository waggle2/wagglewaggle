export interface SignUpData {
  authenticationProvider: 'email' | 'google' | 'kakao' | 'naver'
  socialId?: string
  email: string
  password: string
  nickname: string
  birthYear: number
  gender: '남성' | '여성'
  primaryAnimal: '곰' | '여우' | '개' | '고양이'
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
  isNicknameChecked?: boolean
  birthYear?: string
  gender?: '남성' | '여성' | ''
  loginEmail?: string
  loginPassword?: string
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

export type IErrorResponse = {
  code: number
  message: string
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
