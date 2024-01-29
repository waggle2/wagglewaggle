'use client'
import { useState } from 'react'
import styles from '../styles/empathyButton.module.scss'
import AnimalEmpathy from './AnimalEmpathy'
import Empathy from '/public/assets/empathy.svg'
import CatEmoji from '/public/assets/catEmoji.svg'
import BearEmoji from '/public/assets/bearEmoji.svg'
import DogEmoji from '/public/assets/dogEmoji.svg'
import FoxEmoji from '/public/assets/foxEmoji.svg'

export default function EmpathyButton() {
  const [isClick, setIsClick] = useState(false)

  return (
    <>
      {isClick && (
        <div className={styles.selectAnimal}>
          <CatEmoji width="32" height="32" />
          <BearEmoji width="32" height="32" />
          <DogEmoji width="32" height="32" />
          <FoxEmoji width="32" height="32" />
        </div>
      )}

      <div
        className={styles.buttonSection}
        onClick={() => setIsClick(!isClick)}
      >
        <div className={styles.empathyButton}>
          <Empathy />
          <span>공감하기</span>
        </div>
        <AnimalEmpathy />
      </div>
    </>
  )
}
