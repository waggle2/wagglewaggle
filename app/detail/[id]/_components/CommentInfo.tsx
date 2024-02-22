import styles from '../styles/commentInfo.module.scss'
import Profile from '/public/assets/profile.svg'
import EmpathyButton from './EmpathyButton'
import MoreMenu from '@/app/_components/common/header/_components/MoreMenu'

interface CommentInfoProps {
  nickName: string
  date: string
  content: string
}
export default function CommentInfo({
  nickName,
  date,
  content,
}: CommentInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileCircle}>
          <Profile width="26" height="23" />
        </div>
        <div className={styles.author}>
          <div>
            <h5>{nickName}</h5>
            <span>{date}</span>
          </div>
          <MoreMenu />
        </div>
      </div>
      <span>{content}</span>
      <EmpathyButton />
    </div>
  )
}
