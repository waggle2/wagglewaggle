import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/bottomSheet.module.scss'
interface BottomSheetProps {
  items: JSX.Element[]
  setIsToggle: Dispatch<SetStateAction<boolean>>
}
export default function BottomSheet({ items, setIsToggle }: BottomSheetProps) {
  return (
    <div className={styles.container} onClick={() => setIsToggle(false)}>
      <div className={styles.buttonSection}>
        {items.map((item) => {
          return item
        })}
      </div>
    </div>
  )
}
