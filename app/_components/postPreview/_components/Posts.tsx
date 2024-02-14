import { ReactNode } from 'react'
import axios from '@/node_modules/axios/index'

import Post from './Post'
import api from '@/app/_api/commonApi'

import { postData } from '../_types/responseType'

type props = {
  title?: string
}

//작성자, 조회수 누락
//태그, 카테고리 나누기
//likes 좋아요 누른 유저 , likeNum 좋아요 수

export default async function Posts({ title }: props) {
  let filter = ''

  let data: postData[] = []

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
              image: null,
              name: info.author.credential.nickname,
              animal: info.animalOfAuthor,
              isAnonymous: info.isAnonymous,
            }}
            post={{
              id: info.id,
              category: info.category,
              tag: info.tags[0],
              time: info.createdAt,
              title: info.title,
              content: info.content,
              // likes: info.likes.length,
              likes: 0,
              comments: info.commentNum,
              views: info.views,
            }}
          />
        )
      })}
    </>
  )
}
