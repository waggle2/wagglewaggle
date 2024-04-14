'use client'
import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/question.module.scss'
import { useTrail, animated } from 'react-spring'
import { questions } from '../questions'

interface QuestionProps {
  questionIdx: number
  setQuestionIdx: Dispatch<SetStateAction<number>>
  twoCount: number[]
  fourCount: number[]
  setTwoCount: Dispatch<SetStateAction<number[]>>
  setFourCount: Dispatch<SetStateAction<number[]>>
}
export default function Question({
  questionIdx,
  setQuestionIdx,
  twoCount,
  fourCount,
  setTwoCount,
  setFourCount,
}: QuestionProps) {
  const config = { mass: 8, tension: 2500, friction: 500 }
  const calculate = (idx: number) => {
    if (questionIdx % 2 === 0) {
      const newTwoCount = [...twoCount]
      if (questionIdx <= 5) {
        newTwoCount[idx]++
      } else {
        newTwoCount[idx + 2]++
      }
      setTwoCount(newTwoCount)
    } else {
      const newFourCount = [...fourCount]
      newFourCount[idx]++
      setFourCount(newFourCount)
    }
  }
  const items = questions[questionIdx].map((item, idx) => {
    return (
      <div
        key={idx}
        className={styles.answer}
        onClick={() => {
          setQuestionIdx(questionIdx + 1)
          calculate(idx)
        }}
      >
        {item}
      </div>
    )
  })
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
