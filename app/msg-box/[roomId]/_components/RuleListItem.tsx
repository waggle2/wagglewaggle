import { useEffect, useState } from 'react'
import style from '../styles/ruleListItem.module.scss'

interface Props {
  content: string
  index: number
}

export default function RuleListItem({ content, index }: Props) {
  return (
    <label className={style.customCheckbox} htmlFor={content}>
      <input type="radio" id={content} name="report" />
      <span className={style.textSpan}>{content}</span>
      {index === 4 && (
        <label className={style.etcLabel}>
          <input type="text" placeholder="신고 사유를 작성해주세요." />
        </label>
      )}
    </label>
  )
}
