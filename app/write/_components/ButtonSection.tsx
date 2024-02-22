'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/buttonSection.module.scss'
interface ButtonSectionProps {
  category: string[]
  tag: string[]
  selectedCategory: number
  selectedTag: number
  setSelectedCategory: Dispatch<SetStateAction<number>>
  setSelectedTag: Dispatch<SetStateAction<number>>
  setIsAnonymous: Dispatch<SetStateAction<boolean>>
  editIsAnonymous?: boolean
}
export default function ButtonSection({
  category,
  tag,
  selectedCategory,
  selectedTag,
  setSelectedCategory,
  setSelectedTag,
  setIsAnonymous,
  editIsAnonymous,
}: ButtonSectionProps) {
  const isAnonymous = false
  return (
    <>
      <div className={styles.buttonSection}>
        <div className={styles.tagBox}>
          <h6>이런 주제를 나누고 싶어요</h6>
          <div className={styles.tagText}>
            {category.map((item, idx) => {
              return (
                <div
                  className={`${styles.tag} ${selectedCategory === idx ? styles.selected : ''}`}
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(idx)
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.tagBox}>
          <h6>이런 이야기를 나누고 싶어요</h6>
          <div className={styles.tagText}>
            {tag.map((item, idx) => {
              return (
                <div
                  className={`${styles.tag} ${selectedTag === idx ? styles.selected : ''}`}
                  key={idx}
                  onClick={() => {
                    setSelectedTag(idx)
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.toggleBox}>
        <span>익명</span>
        <label
          className={styles.toggle}
          onClick={() =>
            setIsAnonymous(
              editIsAnonymous !== null ? !editIsAnonymous : !isAnonymous,
            )
          }
        >
          <input
            type="checkbox"
            defaultChecked={
              editIsAnonymous !== null ? editIsAnonymous : isAnonymous
            }
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.boldLine} />
    </>
  )
}
