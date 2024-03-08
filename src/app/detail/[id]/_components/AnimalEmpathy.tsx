import Cat from '/public/assets/catEmoji.svg'
import Bear from '/public/assets/bearEmoji.svg'
import Dog from '/public/assets/dogEmoji.svg'
import Fox from '/public/assets/foxEmoji.svg'
import styles from '../styles/animalEmpathy.module.scss'
import { useEffect, useState } from 'react'

interface AnimalEmpathyProps {
  stickers: {
    userId: string
    id: number
    animal: string
  }[]
}
export default function AnimalEmpathy({ stickers }: AnimalEmpathyProps) {
  const [count, setCount] = useState<{
    [key: string]: number
  }>({
    고냥이: 0,
    곰돌이: 0,
    댕댕이: 0,
    폭스: 0,
  })
  useEffect(() => {
    const newCount: {
      [key: string]: number
    } = {
      고냥이: 0,
      곰돌이: 0,
      댕댕이: 0,
      폭스: 0,
    }
    stickers.forEach((item) => {
      newCount[item.animal]++
    })
    setCount(newCount)
  }, [stickers])
  return (
    <div className={styles.container}>
      <div>
        <Cat width="20" height="20" />
        <span>{count['고냥이']}</span>
      </div>
      <div>
        <Bear width="20" height="20" />
        <span>{count['곰돌이']}</span>
      </div>
      <div>
        <Dog width="20" height="20" />
        <span>{count['댕댕이']}</span>
      </div>
      <div>
        <Fox width="20" height="20" />
        <span>{count['폭스']}</span>
      </div>
    </div>
  )
}
