export type postData = {
  animalOfAuthor: string
  author: author
  category: string
  commentNum: number
  content: string
  createdAt: string
  deletedAt: boolean
  id: number
  imageUrls: string[]
  isAnonymous: boolean
  likes: any[]
  preferredResponseAnimal: string
  tags: string[]
  title: string
  updatedAt: string
  views: number
}

export type author = {
  id: string
  authenticationProvider: string
  authorities: { id: number; authorityName: string }[]
  bearPoints: number
  catPoints: number
  createdAt: string
  credential: {
    birthYear: number
    email: string
    gender: string
    id: number
    nickname: string
    password: string
  }
  currentRefreshToken: string
  deletedAt: any
  dogPoints: number
  foxPoints: number

  isVerified: boolean
  items: any
  primaryAnimal: string
  profileAnimal: string
  profileItems: any[]
  secondAnimal: any
  socialId: any
  state: string
  updatedAt: string
}
