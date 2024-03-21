import { useRecoilState } from 'recoil'
import styles from '../styles/imageBox.module.scss'
import Upload from '/public/assets/upload.svg'
import { mindTestState } from '@/app/_recoil/atoms/mindTestState'

export default function ImageBox() {
  const tag = ['# 똥꼬발랄', '# 나만 바라봐', '# 로맨티스트']
  const [mindTestResult, setMindTestResult] = useRecoilState(mindTestState)
  console.log(mindTestResult)
  return (
    <div className={styles.imageBox}>
      <div className={styles.upload}>
        <Upload width="28" height="28" />
      </div>
      <span className={styles.title}>댕댕이</span>
      <span>열렬히 사랑하는 당신은 댕댕이!</span>
      <div className={styles.image}>임시</div>
      <div className={styles.tagBox}>
        {tag.map((item, idx) => (
          <div className={styles.tag} key={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
