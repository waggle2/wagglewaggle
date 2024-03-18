import Profile from '/public/assets/profile.svg'
import HeartIcon from '/public/assets/heart.svg'
import View from '/public/assets/view.svg'
import styles from '../styles/content.module.scss'
import DOMPurify from 'isomorphic-dompurify'
import LikeSection from './LikeSection'
import VoteComponent from './VoteComponent'

interface ContentProps {
  postId: number
  title: string
  nickName: string
  content: string
  tag: string
  category: string
  date: string
  views: number
  vote: {
    title: string
    endedAt: string
    pollItems: {
      content: string
      id: number
      userIds: string[]
    }[]
  } | null
}
export default function Content({
  postId,
  title,
  nickName,
  content,
  tag,
  category,
  date,
  vote,
  views,
}: ContentProps) {
  return (
    <div className={styles.titleSection}>
      <h4>{title}</h4>
      <div className={styles.profile}>
        <div className={styles.profileCircle}>
          <Profile width="26" height="23" />
        </div>
        <div className={styles.author}>
          <h5>{nickName}</h5>
          <div className={styles.info}>
            <span>{`${tag} · ${category}`}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      {vote && (
        <VoteComponent
          title={vote.title}
          items={vote.pollItems}
          endedDate={vote.endedAt}
        />
      )}
      {typeof window ? (
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        /> //js코드 실행 방지용 라이브러리 사용(해킹 방지)
      ) : (
        <div />
      )}
      <div className={styles.buttonSection}>
        <LikeSection postId={postId} />
        <div>
          <View width="16" height="16" color="#8c8c8c" />
          <span>{views}</span>
        </div>
      </div>
    </div>
  )
}
