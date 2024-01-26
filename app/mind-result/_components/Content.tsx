'use client'
import Description from './Description'
import Upload from '/public/assets/upload.svg'
import Kakao from '/public/assets/kakao.svg'
import styles from '../styles/content.module.scss'
import ImageBox from './ImageBox'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 2000, friction: 400 }
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
          title={['댕댕이는 말이야...', '이런건 조심해!']}
          content={[
            '보기만 해도 기분 좋아지는 똥꼬발랄한 댕댕이는 첫눈에 잘 반하는 스타일입니다. 마음을 자유롭게 표현하고 사랑에 매우 열정적인 스타일인 당신!',
            '마음의 타오르는 열정만큼 연락 빈도가 무척 중요하고 상대도 나만큼 사랑을 주길 바라는 댕댕이들.. 그래서 가끔은 강한 질투를 보이기도 한답니다. 조심해요! 심해지면 집착하고 의존하는 것처럼 보일 수도 있으니까요.',
          ]}
        />
      ),
    },
    {
      element: (
        <Description
          title={['마음 속에 곰을 숨겨둔 당신']}
          content={[
            '보기만 해도 기분 좋아지는 똥꼬발랄한 댕댕이는 첫눈에 잘 반하는 스타일입니다. 마음을 자유롭게 표현하고 사랑에 매우 열정적인 스타일인 당신!',
          ]}
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
