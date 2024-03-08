'use client'

import { Dispatch, SetStateAction } from 'react'
import style from '../styles/ruleListItem.module.scss'
interface Props {
  rule: {
    id: string
    label: string
  }
  setSelectedCategory: Dispatch<SetStateAction<string>>
  selectedCategory: string
}

export default function RuleListItem({
  rule,
  setSelectedCategory,
  selectedCategory,
}: Props) {
  return (
    <div className={style.container}>
      <input
        type="radio"
        name="reportCategory"
        value={rule.id}
        id={rule.id}
        checked={selectedCategory === rule.id}
        onChange={() => {
          setSelectedCategory(rule.id)
        }}
      />
      <label htmlFor={rule.id}>{rule.label}</label>
    </div>
  )
}
