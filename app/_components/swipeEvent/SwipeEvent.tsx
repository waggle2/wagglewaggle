'use client'

import { useEffect, useRef } from 'react'
import style from './swipeEvent.module.scss'

export default function SwipeEvent() {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const divRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const div = divRef.current
    const nav = navRef.current
    // console.log('scrollwidth', divRef.current?.scrollWidth)
    // console.log('scrollreft', divRef.current?.scrollLeft)
    // console.log('offsetwidth', divRef.current?.offsetLeft)
    // console.log('children', divRef.current?.children)
    if (!div || !nav) return

    const updateSort = (element: HTMLDivElement) => {
      const scrollWidth = element.scrollWidth
      const scrollLeft = element.scrollLeft
      const width = element.offsetWidth
      const items = element.children

      // console.log(element, 'element')

      if (scrollLeft <= width) {
        element.prepend(items[items.length - 1])
        element.scrollLeft = scrollLeft + width
      }
      if (scrollWidth - scrollLeft <= width) {
        element.append(items[0])
        element.scrollLeft = scrollLeft - width
      }
    }
    updateSort(div)
  }, [])
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
      <div className={style.currentPage}>1/10</div>
    </div>
  )
}
