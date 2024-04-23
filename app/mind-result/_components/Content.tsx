'use client'
import Description from './Description'
import Upload from '/public/assets/upload.svg'
import Kakao from '/public/assets/kakao.svg'
import styles from '../styles/content.module.scss'
import ImageBox from './ImageBox'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { mindTestState } from '@/app/_recoil/atoms/mindTestState'
import { result } from '../result'

export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 2000, friction: 400 }
  const [mindTestResult, setMindTestResult] = useRecoilState(mindTestState)
  const params = useSearchParams()
  const resultParams = params.get('result')
  useEffect(() => {
    setToggle(!toggle)
    if (resultParams) {
      setMindTestResult(Number(resultParams))
    }
  }, [])
  const router = useRouter()
  const handleShareToKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: result[mindTestResult].shareMessage,
          description: '나의 동물 성향은 어떨까?\n동물로 보는 내 연애 성향',
          imageUrl: result[mindTestResult].imageUrl,
          link: {
            mobileWebUrl: `https://wagglewaggle.vercel.app/mind-result?result=${mindTestResult}`,
            webUrl: `https://wagglewaggle.vercel.app/mind-result?result=${mindTestResult}`,
          },
        },
        buttons: [
          {
            title: '내 연애 성향 알아보기',
            link: {
              mobileWebUrl: `https://wagglewaggle.vercel.app/mind-result?result=${mindTestResult}`,
              webUrl: `https://wagglewaggle.vercel.app/mind-result?result=${mindTestResult}`,
            },
          },
        ],
      })
    }
  }
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://wagglewaggle.vercel.app/mind-result?result=${mindTestResult}`,
      )
      alert('클립보드에 복사되었습니다.')
    } catch (err) {
      alert('클립보드 복사 실패')
    }
  }
  const items = [
    {
      element: <ImageBox copyToClipboard={copyToClipboard} />,
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
              {resultParams ? '나도 테스트하기' : '테스트 다시하기'}
            </div>
            <div
              className={styles.startButton}
              onClick={() => router.push('/login')}
            >
              와글와글 시작하기
            </div>
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
            <Kakao style={{ cursor: 'pointer' }} onClick={handleShareToKakao} />
            <Upload
              style={{ cursor: 'pointer' }}
              onClick={copyToClipboard}
              width="48"
              height="48"
            />
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
