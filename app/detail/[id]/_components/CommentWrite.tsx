import styles from '../styles/commentWrite.module.scss'
import Profile from '/public/assets/profile.svg'
export default function CommentWrite() {
  return (
    <div className={styles.container}>
      <div className={styles.profileCircle}>
        <Profile width="26" height="23" />
      </div>
      <div className={styles.commentWrapper}>
        <textarea className={styles.comment} />
        <div className={styles.commentSubmit}>확인</div>
      </div>
    </div>
  )
}
