'use client'
import RightArrow from '/public/assets/rightArrow.svg'
import Camera from '/public/assets/camera.svg'
import Vote from '/public/assets/vote.svg'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div>
      <div className={styles.ruleButton}>
        커뮤니티 규칙
        <RightArrow />
      </div>
      <div className={styles.buttonBox}>
        <Camera />
        <Vote />
      </div>
    </div>
  )
}
