'use client'
import { useEffect, useState } from 'react'
import styles from './styles/page.module.scss'
import Header from '../_components/common/header/Header'
import LeftArrow from '/public/assets/leftArrow.svg'
import SubmitText from '/public/assets/submitText.svg'
import CircleMinus from '/public/assets/circleMinus.svg'
import CirclePlus from '/public/assets/circlePlus.svg'
import SchedulePicker from './_components/SchedulePicker'
import { useRecoilState } from 'recoil'
import { voteState } from '../_recoil/atoms/voteState'
import { useRouter } from 'next/navigation'

export default function Vote() {
  const [question, setQuestion] = useState<string[]>(['', ''])
  const [title, setTitle] = useState('')
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
  const [voteItems, setVoteItems] = useRecoilState(voteState)
  const [date, setDate] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (voteItems.items.length !== 0) {
      setTitle(voteItems.title)
      setQuestion(voteItems.items)
      setDate(voteItems.endedDate)
    }
  }, [])
  return (
    <div>
      <Header
        leftSection={<LeftArrow />}
        title={'투표받기'}
        rightSection={[
          <SubmitText
            onClick={() => {
              setVoteItems({
                title: title,
                items: question,
                endedDate: voteItems.endedDate,
              })
              router.push('/write')
            }}
          />,
        ]}
      />
      <div className={styles.container}>
        <input
          className={styles.title}
          defaultValue={title}
          placeholder="투표 제목을 입력하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
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
          onClick={() => question.length < 5 && handleAddQuestion()}
        >
          <CirclePlus style={{ cursor: 'pointer' }} fill="#2FD714" />
          항목 추가
        </div>
        <div className={styles.boldLine} />
        <div className={styles.buttonSection}>
          <div>마감기한</div>
          <SchedulePicker />
        </div>
      </div>
    </div>
  )
}
