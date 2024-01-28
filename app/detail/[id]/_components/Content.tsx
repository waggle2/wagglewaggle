import Profile from '/public/assets/profile.svg'
import HeartIcon from '/public/assets/heart.svg'
import View from '/public/assets/view.svg'
import styles from '../styles/content.module.scss'

interface ContentProps {
  title: string
  nickName: string
  content: string
}
export default function Content({ title, nickName, content }: ContentProps) {
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
            <span>수다수다 · 19</span>
            <span>2024-12-01</span>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <span>{content}</span>
      <div className={styles.buttonSection}>
        <div>
          <HeartIcon width="16" height="16" color="#8c8c8c" />
          <span>12</span>
        </div>
        <div>
          <View width="16" height="16" color="#8c8c8c" />
          <span>12</span>
        </div>
      </div>
      <div className={styles.boldLine}></div>
    </div>
  )
}
