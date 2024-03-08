import style from './_styles/emptyFeedback.module.scss'

import FeedBackIcon from '/public/assets/feedbackIcon.svg'
import Button from '@/app/_components/button/Button'
import Link from 'next/link'

export default function EmptyFeedback() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <FeedBackIcon />
        <div>건의사항이 없습니다.</div>
        <Link href={'/mypage/feedback/editFeedback'} className={style.link}>
          <Button text={'작성하기'} mainColor={'green'} />
        </Link>
      </div>
    </div>
  )
}
