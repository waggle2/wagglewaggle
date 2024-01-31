'use client'
import { ChangeEvent, useState } from 'react'
import style from '../styles/birthSelect.module.scss'
export default function BirthSelect() {
 
  const [selectedYear, setSelectedYear] = useState('')

  

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value)
  }

  return (
    
  )
}
