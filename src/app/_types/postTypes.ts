export interface IPost {
  title: string
  content: string
  is_anonymous: boolean
  tag: string
  category: string
  image_urls?: string[]
}
export interface IImage {
  image: File
  imageName: string
}
