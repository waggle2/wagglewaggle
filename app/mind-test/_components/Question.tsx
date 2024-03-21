'use client'
import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/question.module.scss'
import { useTrail, animated } from 'react-spring'
import { useRouter } from 'next/navigation'
import { questions } from '../questions'

interface QuestionProps {
  questionIdx: number
  setQuestionIdx: Dispatch<SetStateAction<number>>
}
export default function Question({
  questionIdx,
  setQuestionIdx,
}: QuestionProps) {
  const config = { mass: 8, tension: 2500, friction: 500 }
  const router = useRouter()
  const items = questions[questionIdx].map((item, idx) => {
    return (
      <div
        key={idx}
        className={styles.answer}
        onClick={() => {
          setQuestionIdx(questionIdx + 1)
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
