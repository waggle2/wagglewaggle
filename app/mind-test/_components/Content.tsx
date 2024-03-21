'use client'
import TestImage from '/public/assets/testImage.svg'
import styles from '../styles/content.module.scss'
import Question from './Question'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { titles } from '../questions'
import { useRouter } from 'next/navigation'
export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 4000, friction: 500 }
  const [questionIdx, setQuestionIdx] = useState(0)
  const router = useRouter()
  useEffect(() => {
    setToggle(!toggle)
    if (questionIdx > 10) {
      router.push('/mind-result')
    }
  }, [questionIdx])
  const items = [
    {
      element: (
        <>
          <progress className={styles.progress} value="10" max="100"></progress>
          <div className={styles.image}>
            <TestImage />
          </div>
        </>
      ),
    },
    {
      element: (
        <div className={styles.title}>
          <span className={styles.question}>Q.</span> {titles[questionIdx]}
        </div>
      ),
    },
    {
      element: (
        <Question questionIdx={questionIdx} setQuestionIdx={setQuestionIdx} />
      ),
    },
  ]
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    reset: true,
  })
  return (
    <>
      {questionIdx <= 10 &&
        trail.map((styles, idx) => (
          <animated.div key={idx} style={styles}>
            <animated.div>{items[idx].element}</animated.div>
          </animated.div>
        ))}
    </>
  )
}
