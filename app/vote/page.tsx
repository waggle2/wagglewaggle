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
import {
  deleteVoteState,
  newVoteState,
  voteState,
} from '../_recoil/atoms/voteState'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { formatDate } from '../_lib/formatDate'

export default function Vote() {
  const [question, setQuestion] = useState<
    { id: null | number; content: string; isNew: boolean }[]
  >([
    { id: null, content: '', isNew: true },
    { id: null, content: '', isNew: true },
  ])
  const [title, setTitle] = useState('')
  const [deleteItems, setDeleteItems] = useRecoilState(deleteVoteState)
  const [newItems, setNewItems] = useRecoilState(newVoteState)
  const handleAddQuestion = () => {
    const newQuestion = [...question]
    newQuestion.push({
      id: (newQuestion[newQuestion.length - 1].id as number) + 1,
      content: '',
      isNew: true,
    })
    setQuestion(newQuestion)
  }
  const handleDeleteQuestion = (idx: number) => {
    const newQuestion = [...question]
    newQuestion.splice(idx, 1)
    setQuestion(newQuestion)
  }
  const handleChangeQustion = (idx: number, value: string) => {
    const newQuestion = [...question]
    newQuestion[idx] = {
      id: newQuestion[idx].id,
      content: value,
      isNew: newQuestion[idx].isNew,
    }
    setQuestion(newQuestion)
  }
  const [voteItems, setVoteItems] = useRecoilState(voteState)
  const [date, setDate] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const postId = params.get('postId')
  useEffect(() => {
    if (voteItems.title !== '') {
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
                endedDate:
                  voteItems.endedDate === ''
                    ? formatDate(dayjs().toString())
                    : voteItems.endedDate,
              })
              if (postId) {
                router.push(`/write/${postId}`)
                setNewItems(question.filter((item) => item.isNew === true))
              } else {
                router.push('/write')
              }
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
                onClick={() => {
                  if (question.length > 2) {
                    handleDeleteQuestion(idx)
                    if (item.isNew !== true) {
                      const newDeleteItems = [...deleteItems]
                      newDeleteItems.push(item.id as number)
                      setDeleteItems(newDeleteItems)
                    }
                  }
                }}
              />
              <input
                className={styles.question}
                placeholder={`질문 ${idx + 1}`}
                readOnly={item.isNew !== true}
                onChange={(e) => handleChangeQustion(idx, e.target.value)}
                value={item.content}
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
