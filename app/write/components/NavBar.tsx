'use client'
import Xmark from '/public/assets/xmark.svg'
import SubmitText from '/public/assets/submitText.svg'
import DropdownToggle from '/public/assets/dropdownToggle.svg'
import styles from '../styles/navbar.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface NavBarProps {
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
}
export default function NavBar({ toggle, setToggle }: NavBarProps) {
  return (
    <>
      <div className={styles.navBar}>
        <Xmark />
        <div
          className={
            toggle ? `${styles.category} ${styles.toggled}` : styles.category
          }
          onClick={() => setToggle(!toggle)}
        >
          <span>짝사랑</span>
          <DropdownToggle fill={toggle ? '#2fd714' : 'black'} />
        </div>
        <SubmitText />
      </div>
    </>
  )
}
