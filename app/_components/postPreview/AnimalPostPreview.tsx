'use client'

import { useState, useEffect } from 'react'

import style from './postPreview.module.scss'

import Link from '@/node_modules/next/link'

import Post from './_components/Post'
import Button from '../button/Button'

import Next from '@/public/assets/next.svg'
import TestProfile from '@/public/assets/profile.svg'
import Town from '@/public/assets/town.svg'

export default function PostPreview() {
  const [selectedAnimal, setSelectedAnimal] = useState('all')

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
          mainColor={selectedAnimal === 'all' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('all')
          }}
        />
        <Button
          text={'고냥이'}
          mainColor={selectedAnimal === 'cat' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('cat')
          }}
        />
        <Button
          text={'곰돌이'}
          mainColor={selectedAnimal === 'bear' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('bear')
          }}
        />
        <Button
          text={'댕댕이'}
          mainColor={selectedAnimal === 'dog' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('dog')
          }}
        />
        <Button
          text={'폭스'}
          mainColor={selectedAnimal === 'fox' ? 'green' : 'grey'}
          borderRadius={'30px'}
          action={() => {
            handleAnimalSelect('fox')
          }}
        />
      </div>
      <div className={style.postContainer}>
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
      </div>
    </section>
  )
}
