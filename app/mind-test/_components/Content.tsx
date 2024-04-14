'use client'
import TestImage from '/public/assets/testImage.svg'
import styles from '../styles/content.module.scss'
import Question from './Question'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { titles } from '../questions'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { mindTestState } from '@/app/_recoil/atoms/mindTestState'
export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 4000, friction: 500 }
  const [questionIdx, setQuestionIdx] = useState(0)
  const [twoCount, setTwoCount] = useState([0, 0, 0, 0])
  const [fourCount, setFourCount] = useState([0, 0, 0, 0])
  const [mindTestResult, setMindTestResult] = useRecoilState(mindTestState)
  const router = useRouter()
  useEffect(() => {
    setToggle(!toggle)
    if (questionIdx > 10) {
      const maxIdx = twoCount.indexOf(Math.max(...twoCount))
      const newFourCount = [...fourCount]
      newFourCount[maxIdx] += 2.5
      setFourCount(newFourCount)
      const resultIdx = fourCount.indexOf(Math.max(...fourCount))
      setMindTestResult(resultIdx)
      router.push('/mind-result')
    }
  }, [questionIdx])
  const items = [
    {
      element: (
        <>
          <progress
            className={styles.progress}
            value={10 * questionIdx}
            max="100"
          ></progress>
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
        <Question
          questionIdx={questionIdx}
          setQuestionIdx={setQuestionIdx}
          twoCount={twoCount}
          fourCount={fourCount}
          setTwoCount={setTwoCount}
          setFourCount={setFourCount}
        />
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
