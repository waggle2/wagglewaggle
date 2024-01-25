'use client'
import Xmark from '/public/assets/xmark.svg'
import styles from '../styles/navbar.module.scss'

export default function NavBar() {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.title}>커뮤니티 규칙</div>
        <Xmark width="24" height="24" />
      </div>
    </>
  )
}
