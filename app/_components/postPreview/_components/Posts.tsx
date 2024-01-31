'use client'

import { useEffect, useState } from 'react'
import axios from '@/node_modules/axios/index'

import style from './post.module.scss'
import Post from './Post'

type props = {
  title: string
}

export default function Posts({ title }: props) {
  const [postPrev, setPostPrev] = useState([''])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}posts?pageSize=2`,
        )
        // setPostPrev(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])
  return (
    <div className={style.container}>
      {postPrev.map((info, index) => {
        return (
          <Post
            profile={{
              image: undefined,
              name: '',
              category: '',
              tag: '',
            }}
            post={{
              time: '',
              title: '',
              content: '',
              likes: 0,
              comments: 0,
              views: 0,
            }}
            key={index}
          />
        )
      })}
    </div>
  )
}
