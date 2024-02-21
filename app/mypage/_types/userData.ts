export type userResponseData = {
  authenticationProvider: string
  bearCoins: number
  catCoins: number
  credential: credential
  dogCoins: number
  foxCoins: number
  isVerified: false
  items: any
  primaryAnimal: string
  profileAnimal: string
  profileItems: []
  secondAnimal: any
  socialId: any
  state: string
}
export type credential = {
  id: number
  email: string
  nickname: string
  birthYear: number
  gender: string
}
