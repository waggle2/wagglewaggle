'use client'

import { useState, useEffect, ReactNode } from 'react'

import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Post from './_components/Post'
import Button from '../button/Button'

import Next from '@/public/assets/next.svg'
import Town from '@/public/assets/town.svg'

import api from '@/app/_api/commonApi'
import { postData } from './_types/responseType'

export default function AnimalPostPreview() {
  const [selectedAnimal, setSelectedAnimal] = useState('전체')
  const [posts, setPosts] = useState<Array<postData>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/posts?${selectedAnimal !== '전체' ? 'animal=' + selectedAnimal + '&' : ''}page=1&pageSize=3`,
        )
        const posts = await res.data
        // console.log(posts, 'animal')

        setPosts(posts)
      } catch (err) {
        // console.error(err)
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
        <Link
          href={{
            pathname: '/bulletin-board',
            query: {
              animal: `${selectedAnimal}`,
              title: '다양한 동물들 소식',
            },
          }}
        >
          <Next />
        </Link>
      </div>
      <div className={style.animalContainer}>
        <Button
          text={'전체'}
          mainColor={selectedAnimal === '전체' ? 'green' : 'none'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('전체')
          }}
        />
        <Button
          text={'고냥이'}
          mainColor={selectedAnimal === '고냥이' ? 'green' : 'none'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('고냥이')
          }}
        />
        <Button
          text={'곰돌이'}
          mainColor={selectedAnimal === '곰돌이' ? 'green' : 'none'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('곰돌이')
          }}
        />
        <Button
          text={'댕댕이'}
          mainColor={selectedAnimal === '댕댕이' ? 'green' : 'none'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('댕댕이')
          }}
        />
        <Button
          text={'폭스'}
          mainColor={selectedAnimal === '폭스' ? 'green' : 'none'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('폭스')
          }}
        />
      </div>
      <div className={style.animalPostContainer}>
        {posts?.map((postData: postData, index: number) => {
          const wearingItem = postData.author?.profileItems?.filter(
            (profileItems: any) => {
              return postData.animalOfAuthor === profileItems.animal
            },
          )
          return (
            <Post
              key={index}
              profile={{
                id: postData.author?.id,
                image: wearingItem,
                name: postData.author?.credential.nickname, //TODO: 02.26 회의 후 탈퇴한 회원 정보 처리
                animal: postData.animalOfAuthor,
                isAnonymous: postData.isAnonymous,
                isWithDraw: postData.author ? true : false,
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
