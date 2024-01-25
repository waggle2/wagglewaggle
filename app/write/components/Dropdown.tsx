'use client'
import styles from '../styles/dropdown.module.scss'

export default function Dropdown() {
  const category = ['썸', '연애', '짝사랑', '이별', '19']
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {category.map((item, idx) => {
          return (
            <div
              className={
                idx === 0
                  ? `${styles.item} ${styles.firstItem}`
                  : `${styles.item}`
              }
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}
