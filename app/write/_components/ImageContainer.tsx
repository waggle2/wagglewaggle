import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/imageContainer.module.scss'
import Xmark from '/public/assets/xmark.svg'

interface ImageConatinerProps {
  setIsImage: Dispatch<SetStateAction<boolean>>
}
export default function ImageContainer({ setIsImage }: ImageConatinerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.closeButton}>
        <Xmark width="16" height="16" onClick={() => setIsImage(false)} />
      </div>
    </div>
  )
}
