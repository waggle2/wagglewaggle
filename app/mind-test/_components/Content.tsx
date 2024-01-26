'use client'
import TestImage from '/public/assets/testImage.svg'
import styles from '../styles/content.module.scss'
import Question from './Question'
import { useTrail, animated } from 'react-spring'
import { useState, useEffect } from 'react'
export default function Content() {
  const [toggle, setToggle] = useState(false)
  const config = { mass: 8, tension: 4000, friction: 500 }
  useEffect(() => {
    setToggle(!toggle)
  }, [])
  const items = [
    {
      element: (
        <>
          <progress className={styles.progress} value="10" max="100"></progress>
          <div className={styles.image}>
            <TestImage />
          </div>
        </>
      ),
    },
    {
      element: (
        <div className={styles.title}>
          <span className={styles.question}>Q.</span> 술을 마셨는데 필름이
          끊겼다. 일어나보니 내게 일어난 일은?
        </div>
      ),
    },
    {
      element: <Question />,
    },
  ]
  const trail = useTrail(items.length, {
    config,
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    reset: true,
  })
  return (
    <>
      {trail.map((styles, idx) => (
        <animated.div key={idx} style={styles}>
          <animated.div>{items[idx].element}</animated.div>
        </animated.div>
      ))}
    </>
  )
}
