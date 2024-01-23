'use client'
import Xmark from '/public/assets/xmark.svg'
import SubmitText from '/public/assets/submitText.svg'
import DropdownToggle from '/public/assets/dropdownToggle.svg'

import styles from './navbar.module.scss'

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <Xmark />
      <div className={styles.category}>
        <span>짝사랑</span>
        <DropdownToggle />
      </div>
      <SubmitText />
    </div>
  )
}
