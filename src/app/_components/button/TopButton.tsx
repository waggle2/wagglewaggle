'use client'

import style from './button.module.scss'
import TopButtonIcon from '/public/assets/topButton.svg'

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className={style.topContainer}>
      <p className={style.topWrapper}>
        <TopButtonIcon onClick={scrollToTop} />
      </p>
    </div>
  )
}
