import React, { useState, useRef } from 'react'
import style from './styles/apply.module.scss'
import RefreshIcon from '@/public/assets/ico_refresh.svg'

type props = {
  handleResetClick: () => void
  handleApplyClick: () => void
}

export default function ApplyProfile({
  handleResetClick,
  handleApplyClick,
}: props) {
  return (
    <div className={style.applyContainer}>
      <button className={style.resetBtn} onClick={handleResetClick}>
        <RefreshIcon className={style.refreshIcon} />
      </button>
      <button className={style.toggleBtn} onClick={handleApplyClick}>
        선택적용
      </button>
    </div>
  )
}
