'use client'
import { Carousel } from 'antd'
import style from './swipeEvent.module.scss'
import { useState } from 'react'
import Image from 'next/image'

export default function SwipeEvent() {
  const testArray = [
    '/assets/banner_cat.jpg',
    '/assets/banner_bear.jpg',
    '/assets/banner_dog.jpg',
    '/assets/banner_fox.jpg',
  ]
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (current: number) => {
    setCurrentPage(current + 1)
  }

  return (
    <div className={style.containerWrapper}>
      <Carousel afterChange={handleChange} draggable autoplay autoplaySpeed={5000} dots={false}>
        {testArray.map((info, index) => (
          <div className={style.item} key={index}>
            <Image src={info} alt='배너이미지' width={398} height={180} />
            {info}
          </div>
        ))}
      </Carousel>
      <div className={style.currentPage}>{currentPage}/{testArray.length}</div>
    </div>
  )
}
