import { ReactNode } from 'react'
import axios from '@/node_modules/axios/index'

import Post from './Post'
import api from '@/app/_api/commonApi'

type props = {
  title?: string
  animal?: string
}
type postData = {
  id: number
  animal?: string
  commentNum: number
  content: string
  createdAt: string
  imageUrls?: ReactNode
  isAnonymous: boolean
  likeNum: number
  likes: null
  tags: string[]
  title: string
}
//작성자, 조회수 누락
//태그, 카테고리 나누기
//likes 좋아요 누른 유저 , likeNum 좋아요 수

export default async function Posts({ title }: props) {
  let filter = ''
  // const selectAnimal = animal ? `&animal=${animal}` : ''
  let data: postData[] = [
    {
      id: 0,
      animal: '',
      commentNum: 0,
      content: '',
      createdAt: '',
      imageUrls: '',
      isAnonymous: true,
      likeNum: 0,
      likes: null,
      tags: ['', ''],
      title: '',
    },
  ]

  switch (title) {
    case '따끈따끈 최신글':
      filter = ''
      break

    case '연애 TIP':
      filter = '&tags=연애'
      break

    default:
      break
  }

  try {
    const res = await api.get(`/posts?page=1&pageSize=2${filter}`)

    data = await res.data.data
    // console.log(data)
  } catch (err) {
    console.error(err)
  }

  return (
    <>
      {data?.map((info, index: number) => {
        return (
          <Post
            key={index}
            profile={{
              image: info.imageUrls,
              name: 'undefined',
              animal: info.animal,
            }}
            post={{
              id: info.id,
              category: info.tags[0],
              tag: info.tags[1],
              time: info.createdAt,
              title: info.title,
              content: info.content,
              likes: info.likeNum,
              comments: info.commentNum,
              views: 0,
            }}
          />
        )
      })}
    </>
  )
}
