import MoreMenu from '@/app/_components/common/header/_component/MoreMenu'
import styles from '../styles/comment.module.scss'
import Profile from '/public/assets/profile.svg'
import EmpathyButton from './EmpathyButton'

interface CommentProps {
  nickName: string
}
export default function Comment({ nickName }: CommentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileCircle}>
          <Profile width="26" height="23" />
        </div>
        <div className={styles.author}>
          <div>
            <h5>{nickName}</h5>
            <span>2024-12-03 14:30</span>
          </div>
          <MoreMenu />
        </div>
      </div>
      <span>
        미친거 아님? 너 그러다 잡혀가 정신차려 제발 이 각박한 세상에서
        왜그러는거야
      </span>
      <EmpathyButton />
    </div>
  )
}
