'use client'

import { ReactNode, useEffect, useState } from 'react'
import axios from '@/node_modules/axios/index'

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

export default function Posts({ title }: props) {
  const [postPrev, setPostPrev] = useState(Array<postData>)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}posts?page=1&pageSize=2`,
        )
        console.log(res.data.data, 'response')

        setPostPrev(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {postPrev.map((info, index) => {
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
