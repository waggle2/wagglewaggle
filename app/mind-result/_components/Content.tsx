'use client'
import Description from './Description'
import Upload from '/public/assets/upload.svg'
import Kakao from '/public/assets/kakao.svg'
import styles from '../styles/content.module.scss'
import ImageBox from './ImageBox'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { mindTestState } from '@/app/_recoil/atoms/mindTestState'
import { result } from '../result'

export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 2000, friction: 400 }
  const [mindTestResult, setMindTestResult] = useRecoilState(mindTestState)
  useEffect(() => {
    setToggle(!toggle)
  }, [])
  const router = useRouter()
  const items = [
    {
      element: <ImageBox />,
    },
    {
      element: (
        <Description
          title={[
            `${result[mindTestResult].name}는 말이야...`,
            '이런건 조심해!',
          ]}
          content={result[mindTestResult].description}
        />
      ),
    },
    {
      element: (
        <>
          <div className={styles.buttonSection}>
            <div
              className={styles.button}
              onClick={() => router.push('/mind-test')}
            >
              테스트 다시하기
            </div>
            <div className={styles.startButton}>와글와글 시작하기</div>
          </div>
          <div className={styles.line} />
        </>
      ),
    },
    {
      element: (
        <div className={styles.share}>
          테스트 결과, 함께 공유해요!
          <div className={styles.shareButton}>
            <Kakao />
            <Upload width="48" height="48" />
          </div>
        </div>
      ),
    },
  ]
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: -80 },
    to: { opacity: 1, y: 0 },
    reset: true,
  })
  return (
    <div className={styles.container}>
      {trail.map((styles, idx) => (
        <animated.div key={idx} style={styles}>
          <animated.div>{items[idx].element}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}
