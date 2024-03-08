import style from './_styles/feedbackList.module.scss'
import { feedbackResData } from '../_types/feedbackResType'
import Button from '@/app/_components/button/Button'
import FeedbackPost from './feedbackPost'
import Link from '@/node_modules/next/link'
type props = {
  feedbackResData?: feedbackResData[]
  onClick?: () => void
}
export default function FeedbackList({ feedbackResData }: props) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {feedbackResData?.map((feedbackData) => (
          <FeedbackPost
            id={feedbackData.id}
            email={feedbackData.email}
            title={feedbackData.title}
            content={feedbackData.content}
            userId={feedbackData.userId}
            resolved={feedbackData.resolved}
            createdAt={feedbackData.createdAt}
            key={feedbackData.id}
          />
        ))}
      </div>
      <Link href={'/mypage/feedback/editFeedback'}>
        <Button text={'작성하기'} mainColor={'green'} />
      </Link>
    </div>
  )
}
