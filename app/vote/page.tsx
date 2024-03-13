'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './styles/page.module.scss'
import Header from '../_components/common/header/Header'
import LeftArrow from '/public/assets/leftArrow.svg'
import SubmitText from '/public/assets/submitText.svg'
import CircleMinus from '/public/assets/circleMinus.svg'
import CirclePlus from '/public/assets/circlePlus.svg'
import SchedulePicker from './_components/SchedulePicker'

export default function Vote() {
  const [question, setQuestion] = useState<string[]>(['', ''])
  const handleAddQuestion = () => {
    const newQuestion = [...question]
    newQuestion.push('')
    setQuestion(newQuestion)
  }
  const handleDeleteQuestion = (idx: number) => {
    const newQuestion = [...question]
    console.log(newQuestion)
    newQuestion.splice(idx, 1)
    setQuestion(newQuestion)
  }
  const handleChangeQustion = (idx: number, value: string) => {
    const newQuestion = [...question]
    newQuestion[idx] = value
    setQuestion(newQuestion)
  }
  const [count, setCount] = useState(1)
  return (
    <div>
      <Header
        leftSection={<LeftArrow />}
        title={'투표받기'}
        rightSection={[<SubmitText />]}
      />
      <div className={styles.container}>
        <input className={styles.title} placeholder="투표 제목을 입력하세요." />
        <div className={styles.line} />
        {question.map((item, idx) => {
          return (
            <div className={styles.questionWrapper} key={idx}>
              <CircleMinus
                style={{ cursor: 'pointer' }}
                onClick={() => question.length > 2 && handleDeleteQuestion(idx)}
              />
              <input
                className={styles.question}
                placeholder={`질문 ${idx + 1}`}
                onChange={(e) => handleChangeQustion(idx, e.target.value)}
                value={item}
              />
            </div>
          )
        })}
        <div
          className={styles.addButton}
          onClick={() => question.length < 8 && handleAddQuestion()}
        >
          <CirclePlus style={{ cursor: 'pointer' }} fill="#2FD714" />
          항목 추가
        </div>
        <div className={styles.boldLine} />
        <div className={styles.buttonSection}>
          <div>마감기한</div>
          <SchedulePicker />
          <div className={styles.countSection}>
            <span>답변수</span>
            <div className={styles.count}>
              <CircleMinus
                style={{ cursor: 'pointer' }}
                onClick={() => count > 1 && setCount(count - 1)}
              />
              {count}
              <CirclePlus
                style={{ cursor: 'pointer' }}
                onClick={() => count < 3 && setCount(count + 1)}
                fill="#1a1a1a"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
