'use client'

import { useEffect, useRef } from 'react'
import style from './swipeEvent.module.css'

export default function SwipeEvent() {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const divRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  console.log(divRef.current?.scrollWidth)
  return (
    <div className={style.containerWrapper}>
      <div className={style.container} ref={divRef}>
        {testArray.map((info, index) => {
          return (
            <div className={style.item} key={index}>
              {info}
            </div>
          )
        })}
      </div>
    </div>
  )
}
