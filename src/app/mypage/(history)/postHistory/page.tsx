'use client'

import api from '@/app/_api/commonApi'
import Post from '@/app/_components/postPreview/_components/Post'
import { postData } from '@/app/_components/postPreview/_types/responseType'
import { useState } from 'react'
import { useEffect } from 'react'

export default function PostHistory() {
  const [postData, setPostData] = useState<postData[]>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/posts/self?page=1&pageSize=10')
        console.log(res.data)
        setPostData(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      {postData?.map((postData: postData, index: number) => {
        return (
          <Post
            profile={{
              image: undefined,
              name: postData.author.credential.nickname,
              animal: postData.animalOfAuthor,
              isAnonymous: postData.isAnonymous,
            }}
            post={{
              id: postData.id,
              tag: postData.tag,
              category: postData.category,
              time: postData.createdAt,
              title: postData.title,
              content: postData.content,
              likes: postData?.likes,
              comments: postData.commentNum,
              views: postData.views,
            }}
            key={index}
          />
        )
      })}
    </>
  )
}
