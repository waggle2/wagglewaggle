import style from './_styles/feedbackPost.module.scss'
import { formatDate } from '@/app/_lib/formatDate'
import { feedbackResData } from '../_types/feedbackResType'

export default function FeedbackPost(feedbackData: feedbackResData) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>{feedbackData.title}</div>
        <div className={style.time}>{formatDate(feedbackData.createdAt)}</div>
      </div>
      <div className={style.content}>{feedbackData.content}</div>
    </div>
  )
}
