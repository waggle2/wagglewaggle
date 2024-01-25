'use client'
import RightArrow from '/public/assets/rightArrow.svg'
import Camera from '/public/assets/camera.svg'
import Vote from '/public/assets/vote.svg'
import styles from '../styles/footer.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

interface FooterProps {
  setIsImage: Dispatch<SetStateAction<boolean>>
  setIsVote: Dispatch<SetStateAction<boolean>>
}
export default function Footer({ setIsImage, setIsVote }: FooterProps) {
  const route = useRouter()
  return (
    <div>
      <div className={styles.ruleButton} onClick={() => route.push('/rule')}>
        커뮤니티 규칙
        <RightArrow />
      </div>
      <div className={styles.buttonBox}>
        <Camera onClick={() => setIsImage(true)} />
        <Vote onClick={() => setIsVote(true)} />
      </div>
    </div>
  )
}
