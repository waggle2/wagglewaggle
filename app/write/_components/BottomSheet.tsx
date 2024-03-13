import styles from '../styles/bottomSheet.module.scss'
export default function BottomSheet() {
  return (
    <div className={styles.container}>
      <div>투표 삭제</div>
      <div>투표 수정</div>
    </div>
  )
}
