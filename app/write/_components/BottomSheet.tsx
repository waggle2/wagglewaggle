import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/bottomSheet.module.scss'
import { useRouter } from 'next/navigation'
interface BottomSheetProps {
  setIsModal: Dispatch<SetStateAction<boolean>>
}
export default function BottomSheet({ setIsModal }: BottomSheetProps) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div style={{ color: '#ff0a36' }} onClick={() => setIsModal(true)}>
        투표 삭제
      </div>
      <div onClick={() => router.push('/vote')}>투표 수정</div>
    </div>
  )
}
