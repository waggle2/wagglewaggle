export type postData = {
  animalOfAuthor: string
  category: string
  commentNum: number
  content: string
  createdAt: string
  deletedAt: boolean
  id: number
  imageUrls: string[]
  isAnonymous: boolean
  likes: any[]
  tag: string
  title: string
  updatedAt: string
  views: number
  author: author
}
type author = {
  id: string
  authenticationProvider: string
  socialId: string
  isVerified: boolean
  state: string
  primaryAnimal: string
  secondAnimal: null
  profileAnimal: string
  catCoins: number
  bearCoins: number
  dogCoins: number
  foxCoins: number
  currentRefreshToken: string
  items: any[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  credential: credential
}
type credential = {
  birthYear: number
  email: string
  gender: string
  id: number
  nickname: string
}
