'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styles from '../styles/question.module.scss'
import { useTrail, animated } from 'react-spring'
import { useRouter } from 'next/navigation'

export default function Question() {
  const [isFour, setIsFour] = useState(false)
  const config = { mass: 8, tension: 2500, friction: 500 }
  const router = useRouter()
  const twoAnswer = [
    '전 애인에게 전화한 기록이 남아있다',
    '그런 일은 나에게 일어나지 않는다',
  ]
  const fourAnswer = [
    '함께 많은 활동을 하는 에너지 넘치는 데이트',
    '새롭고 흥미로운 경험을 하는 데이트',
    '진지한 대화를 나누는 조용한 데이트',
    '각자의 시간을 존중하는 여유로운 데이트',
  ]
  const items = isFour
    ? fourAnswer.map((item, idx) => (
        <div
          key={idx}
          className={styles.answer}
          onClick={() => {
            router.push('/mind-result')
            setIsFour(!isFour)
          }}
        >
          {item}
        </div>
      ))
    : twoAnswer.map((item, idx) => (
        <div
          key={idx}
          className={styles.answer}
          onClick={() => {
            setIsFour(!isFour)
          }}
        >
          {item}
        </div>
      ))
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    reset: true,
  })

  return (
    <>
      {trail.map((props, idx) => (
        <animated.div key={idx} style={props}>
          <animated.div>{items[idx]}</animated.div>
        </animated.div>
      ))}
    </>
  )
}
