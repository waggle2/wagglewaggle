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

  let data: postData[] = [
    {
      animalOfAuthor: '',
      author: {
        id: '',
        authenticationProvider: '',
        authorities: [{ id: 0, authorityName: '' }],
        bearPoints: 0,
        catPoints: 0,
        createdAt: '',
        credential: {
          birthYear: 0,
          email: '',
          gender: '',
          id: 0,
          nickname: '',
          password: '',
        },
        currentRefreshToken: '',
        deletedAt: '',
        dogPoints: 0,
        foxPoints: 0,

        isVerified: false,
        items: [],
        primaryAnimal: '',
        profileAnimal: '',
        profileItems: [],
        secondAnimal: '',
        socialId: '',
        state: '',
        updatedAt: '',
      },
      category: '',
      commentNum: 0,
      content: '',
      createdAt: '',
      deletedAt: false,
      id: 0,
      imageUrls: [],
      isAnonymous: false,
      likes: [],
      preferredResponseAnimal: '',
      tags: [],
      title: '',
      updatedAt: '',
      views: 0,
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

    const data = await res.data.data.data
    console.log(data, 'data')
  } catch (err) {
    console.error(err)
  }

  return (
    <>
      {data.map((postData, index: number) => {
        return (
          <Post
            key={index}
            profile={{
              image: null,
              name: postData.author.credential.nickname,
              animal: postData.animalOfAuthor,
              isAnonymous: postData.isAnonymous,
            }}
            post={{
              id: postData.id,
              category: postData.category,
              tag: postData.tags[0],
              time: postData.createdAt,
              title: postData.title,
              content: postData.content,
              // likes: postData.likes.length,
              likes: 0,
              comments: postData.commentNum,
              views: postData.views,
            }}
          />
        )
      })}
    </>
  )
}
