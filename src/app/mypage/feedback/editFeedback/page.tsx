'use client'

import Button from '@/app/_components/button/Button'
import Modal from '@/app/_components/common/modal/Modal'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import style from './editFeedback.module.scss'
import EmailInput, { FeedbackContent } from './_components/emailInput'
import api from '@/app/_api/commonApi'

export default function EditFeedback() {
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [modalView, setModalView] = useState(false)

  const router = useRouter()

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value)
  }
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value)
  }
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(() => e.target.value)
  }
  const handleSubmit = async () => {
    try {
      const res = await api.post('/feedbacks', { title, content, email })
      console.log(res)
      setModalView(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handleSuccess = () => {
    router.replace('/mypage')
  }
  return (
    <div className={style.container}>
      <EmailInput
        title={'이메일'}
        placeholder={'답변 받으실 이메일을 적어주세요.'}
        text={email}
        onChange={handleChangeEmail}
      />
      <FeedbackContent
        title={title}
        content={content}
        handleTitleChange={handleChangeTitle}
        handleContentChange={handleChangeContent}
      />
      <Button text={'제출하기'} mainColor={'green'} action={handleSubmit} />
      {modalView && (
        <Modal
          title={<div className={style.title}>제출 완료</div>}
          content={
            <div className={style.content}>
              정상적으로 제출되었습니다. 확인하여 적어주신 이메일로
              답변드리겠습니다.
            </div>
          }
          buttons={[
            <Button
              text={'확인'}
              mainColor={'green'}
              action={handleSuccess}
              key="success"
            />,
          ]}
        />
      )}
    </div>
  )
}
