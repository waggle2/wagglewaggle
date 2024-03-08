'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { animated, useTrail } from 'react-spring'
import styles from '../styles/content.module.scss'
export default function Content() {
  const title = [
    '나는 어떤 동물과 통할까요?\n와글와글에서 찾아봐요',
    '다른 친구들이 바라보는\n 나는 어떤 동물일까요?',
    '동물 포인트로\n 귀여운 아바타를 꾸며요',
  ]
  const content = [
    '원하는 주제 / 답변에 따라\n 좌충우돌 연애 이야기를 나눠봐요',
    '친구들이 전해준 동물 포인트로\n 숨겨진 나의 성향을 파악해요',
    '프로필을 꾸며 와글와글 세상 속\n 나만의 모습을 만들어봐요',
  ]
  const [idx, setIdx] = useState(0)
  const config = { mass: 10, tension: 3000, friction: 500 }
  const [toggle, setToggle] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  useEffect(() => {
    setToggle(!toggle)
  }, [])
  const router = useRouter()
  const items = [
    {
      element: (
        <div className={styles.title} onClick={() => handleAddIdx()}>
          {title[idx]}
        </div>
      ),
    },
    {
      element: (
        <div className={styles.content} onClick={() => handleAddIdx()}>
          {content[idx]}
        </div>
      ),
    },
    {
      element: (
        <div className={styles.image} onClick={() => handleAddIdx()}>
          임시
        </div>
      ),
    },
    {
      element: (
        <div className={styles.circleContainer}>
          {title.map((_, currentIdx) => {
            return (
              <div
                className={
                  currentIdx === idx ? `${styles.currentCircle}` : styles.circle
                }
              ></div>
            )
          })}
        </div>
      ),
    },
    {
      element: (
        <div className={styles.startButton} onClick={() => router.push('/')}>
          와글와글 시작하기
        </div>
      ),
    },
    {
      element: (
        <span className={styles.navText}>
          이미 회원이신가요?{' '}
          <span className={styles.login} onClick={() => router.push('/login')}>
            로그인
          </span>
        </span>
      ),
    },
  ]
  const initialTrail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
  })
  const swipe = useTrail(3, {
    config,
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: true,
  })
  const handleAddIdx = () => {
    if (idx !== 2) {
      setIdx(idx + 1)
    } else {
      setIdx(0)
    }
    setIsLanding(true)
  }
  return (
    <div className={styles.container}>
      {!isLanding ? (
        initialTrail.map((style, idx) => (
          <animated.div key={idx} style={style}>
            <animated.div>{items[idx].element}</animated.div>
          </animated.div>
        ))
      ) : (
        <>
          {swipe.map((styles, idx) => (
            <animated.div key={idx} style={styles}>
              <animated.div>{items[idx].element}</animated.div>
            </animated.div>
          ))}
          <div className={styles.circleContainer}>
            {title.map((_, currentIdx) => {
              return (
                <div
                  className={
                    currentIdx === idx
                      ? `${styles.currentCircle}`
                      : styles.circle
                  }
                ></div>
              )
            })}
          </div>
        </>
      )}
      {isLanding && (
        <>
          <div className={styles.startButton} onClick={() => router.push('/')}>
            와글와글 시작하기
          </div>
          <span className={styles.navText}>
            이미 회원이신가요?{' '}
            <span
              className={styles.login}
              onClick={() => router.push('/login')}
            >
              로그인
            </span>
          </span>
        </>
      )}
    </div>
  )
}
