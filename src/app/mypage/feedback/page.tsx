'use client'

import api from '@/app/_api/commonApi'
import { useEffect, useState } from 'react'
import EmptyFeedback from './_components/emptyFeedback'
import FeedbackList from './_components/feedbackList'
import { feedbackResData } from './_types/feedbackResType'

export default function Feedback() {
  const [feedbackData, setFeedbackData] = useState<Array<feedbackResData>>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/feedbacks/self')
        console.log(res)
        setFeedbackData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      {feedbackData?.length === 0 ? (
        <EmptyFeedback />
      ) : (
        <FeedbackList feedbackResData={feedbackData} />
      )}
    </>
  )
}
