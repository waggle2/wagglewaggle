import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/bottomSheet.module.scss'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { contentState } from '@/app/_recoil/atoms/voteState'
interface BottomSheetProps {
  postId?: number
  setIsModal: Dispatch<SetStateAction<boolean>>
  title: string
  content: string
  category: number
  tag: number
  isAnonymous: boolean
}
export default function BottomSheet({
  setIsModal,
  postId,
  title,
  content,
  category,
  tag,
  isAnonymous,
}: BottomSheetProps) {
  const router = useRouter()
  const [contentItems, setContentItems] = useRecoilState(contentState)
  return (
    <div className={styles.container}>
      <div style={{ color: '#ff0a36' }} onClick={() => setIsModal(true)}>
        투표 삭제
      </div>
      <div
        onClick={() => {
          if (postId) {
            router.push(`/vote?postId=${postId}`)
          } else {
            router.push('/vote')
          }
          setContentItems({
            title: title,
            content: content,
            category: category,
            tag: tag,
            isAnonymous: isAnonymous,
          })
        }}
      >
        투표 수정
      </div>
    </div>
  )
}
