'use client'
import Camera from '/public/assets/camera.svg'
import Vote from '/public/assets/vote.svg'
import styles from '../styles/toolbar.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface FooterProps {
  setIsImage: Dispatch<SetStateAction<boolean>>
  setIsVote: Dispatch<SetStateAction<boolean>>
}
export default function Footer({ setIsImage, setIsVote }: FooterProps) {
  return (
    <div>
      <div className={styles.buttonBox}>
        <Camera onClick={() => setIsImage(true)} />
        <Vote onClick={() => setIsVote(true)} />
      </div>
    </div>
  )
}
