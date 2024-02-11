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
  isEmailChecked?: boolean
  password?: string
  passwordCheck?: string
  nickname?: string
  isNicknameChecked?: boolean
  birthYear?: string
  gender?: '남성' | '여성' | ''
}

export interface IErrors {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
  birthYear?: string
  gender?: 'man' | 'woman' | ''
}
