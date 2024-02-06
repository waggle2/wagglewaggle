'use client'

import { useState, useEffect, ReactNode } from 'react'

import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Post from './_components/Post'
import Button from '../button/Button'

import Next from '@/public/assets/next.svg'

import Town from '@/public/assets/town.svg'
import axios from '@/node_modules/axios/index'

import Posts from './_components/Posts'

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

export default function AnimalPostPreview() {
  const [selectedAnimal, setSelectedAnimal] = useState('')
  const [posts, setPosts] = useState<Array<postData>>()

  useEffect(() => {
    console.log(
      `${process.env.NEXT_PUBLIC_URL}posts?page=1&pageSize=2${selectedAnimal !== '' && '&animal:' + selectedAnimal}`,
    )
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}posts?page=1&pageSize=2${selectedAnimal !== '' && '&animal=' + selectedAnimal}`,
        )
        const posts = await res.data.data
        console.log(posts, 'animal')
        setPosts(posts)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [selectedAnimal])
  const handleAnimalSelect = (animal: string) => {
    setSelectedAnimal(() => animal)
  }

  return (
    <section className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.titleWrapper}>
          <Town />
          <label className={style.title}>{'다양한 동물들 소식'}</label>
        </div>
        <Link href={'./'}>
          <Next />
        </Link>
      </div>
      <div className={style.animalContainer}>
        <Button
          text={'전체'}
          mainColor={selectedAnimal === '' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('')
          }}
        />
        <Button
          text={'고냥이'}
          mainColor={selectedAnimal === '고양이' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('고양이')
          }}
        />
        <Button
          text={'곰돌이'}
          mainColor={selectedAnimal === '곰' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('곰')
          }}
        />
        <Button
          text={'댕댕이'}
          mainColor={selectedAnimal === '개' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('개')
          }}
        />
        <Button
          text={'폭스'}
          mainColor={selectedAnimal === '여우' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('여우')
          }}
        />
      </div>
      <div className={style.postContainer}>
        {posts?.map((info, index: number) => {
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
      </div>
    </section>
  )
}
