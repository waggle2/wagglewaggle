// 'use client'

import { ReactNode, useEffect, useState } from 'react'
import axios from '@/node_modules/axios/index'
import Each from '@/app/_lib/each'

import style from './post.module.scss'
import Post from './Post'

type props = {
  title: string
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
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}posts?page=1&pageSize=2`,
    )

    // console.log(res.data.posts, 'response')
    data = await res.data.posts
  } catch (err) {
    console.error(err)
  }

  {
    /* {postPrev &&
    postPrev.map((info, index) => {
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
    })} */
  }
  return (
    <>
      {data &&
        data?.map((info, index: number) => {
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
