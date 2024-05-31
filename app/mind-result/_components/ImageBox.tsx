import { useRecoilState } from 'recoil'
import styles from '../styles/imageBox.module.scss'
import Upload from '/public/assets/upload.svg'
import { mindTestState } from '@/app/_recoil/atoms/mindTestState'
import { result } from '../result'
import TestResult_0 from '@/public/assets/testResult_0.svg'
import TestResult_1 from '@/public/assets/testResult_1.svg'
import TestResult_2 from '@/public/assets/testResult_2.svg'
import TestResult_3 from '@/public/assets/testResult_3.svg'

interface ImageBoxProps {
  copyToClipboard: () => void
}
export default function ImageBox({ copyToClipboard }: ImageBoxProps) {
  const [mindTestResult, setMindTestResult] = useRecoilState(mindTestState)
  const Image = () => {
    switch (mindTestResult) {
      case 0: {
        return <TestResult_0 />
      }
      case 1: {
        return <TestResult_1 />
      }
      case 2: {
        return <TestResult_2 />
      }
      default: {
        return <TestResult_3 />
      }
    }
  }
  return (
    <div className={styles.imageBox}>
      <div className={styles.upload}>
        <Upload width="28" height="28" onClick={copyToClipboard} />
      </div>
      <span className={styles.title}>{result[mindTestResult].name}</span>
      <span>{result[mindTestResult].script}</span>
      <div className={styles.image}>
        <Image />
      </div>
      <div className={styles.tagBox}>
        {result[mindTestResult].tag.map((item, idx) => (
          <div className={styles.tag} key={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
