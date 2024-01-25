'use client'
import Xmark from '/public/assets/xmark.svg'
import SubmitText from '/public/assets/submitText.svg'
import DropdownToggle from '/public/assets/dropdownToggle.svg'
import styles from '../styles/navbar.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface NavBarProps {
  isToggle: boolean
  setIsToggle: Dispatch<SetStateAction<boolean>>
}
export default function NavBar({ isToggle, setIsToggle }: NavBarProps) {
  return (
    <>
      <div className={styles.navBar}>
        <Xmark width="24" height="24" />
        <div
          className={
            isToggle ? `${styles.category} ${styles.toggled}` : styles.category
          }
          onClick={() => setIsToggle(!isToggle)}
        >
          <span>짝사랑</span>
          <DropdownToggle fill={isToggle ? '#2fd714' : 'black'} />
        </div>
        <SubmitText />
      </div>
    </>
  )
}
