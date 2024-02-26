'use client'

import { useState, useEffect, ReactNode } from 'react'

import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Post from './_components/Post'
import Button from '../button/Button'

import Next from '@/public/assets/next.svg'
import Town from '@/public/assets/town.svg'

<<<<<<< HEAD
import Posts from './_components/Posts'
=======
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
import api from '@/app/_api/commonApi'

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
    const fetchData = async () => {
      try {
        const res = await api.get(
<<<<<<< HEAD
          `/posts?page=1&pageSize=2${selectedAnimal !== '' && '&animal=' + selectedAnimal}`,
=======
          `/posts?${selectedAnimal !== '' ? 'animal=' + selectedAnimal + '&' : ''}page=1&pageSize=3`,
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
        )
        const posts = await res.data
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
          mainColor={selectedAnimal === '고냥이' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('고냥이')
          }}
        />
        <Button
          text={'곰돌이'}
          mainColor={selectedAnimal === '곰돌이' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('곰돌이')
          }}
        />
        <Button
          text={'댕댕이'}
          mainColor={selectedAnimal === '댕댕이' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('댕댕이')
          }}
        />
        <Button
          text={'폭스'}
          mainColor={selectedAnimal === '폭스' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('폭스')
          }}
        />
      </div>
      <div className={style.animalPostContainer}>
        {posts?.map((postData, index: number) => {
          return (
            <Post
              key={index}
              profile={{
                image: null,
                // name: postData.author.credential.nickname,
                name: 'nickname',
                animal: postData.animalOfAuthor,
                isAnonymous: postData.isAnonymous,
              }}
              post={{
                id: postData.id,
                category: postData.category,
                tag: postData.tag,
                time: postData.createdAt,
                title: postData.title,
                content: postData.content,
                likes: postData.likes,
                comments: postData.commentNum,
                views: postData.views,
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
