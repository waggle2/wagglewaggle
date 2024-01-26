'use client'
import { useEffect, useState } from 'react'
import styles from '../styles/content.module.scss'
import VerticalLogo from '/public/assets/verticalLogo.svg'
import { useTrail, animated } from 'react-spring'
import { useRouter } from 'next/navigation'
const config = { mass: 8, tension: 3000, friction: 500 }
export default function Content() {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    setToggle(!toggle)
  }, [])
  const router = useRouter()
  const items = [
    {
      element: (
        <div className={styles.logo}>
          <VerticalLogo />
          <div className={styles.image}>임시</div>
        </div>
      ),
    },
    {
      element: (
        <span>
          연애할 때<br />
          나는 어떤 스타일일까?
        </span>
      ),
    },
    {
      element: (
        <div
          className={styles.startButton}
          onClick={() => router.push('/mind-test')}
        >
          동물 유형 테스트 시작하기
        </div>
      ),
    },
    {
      element: <div className={styles.button}>와글와글 로그인</div>,
    },
  ]
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: -20 },
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
