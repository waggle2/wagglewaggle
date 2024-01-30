'use client'
import { ChangeEvent, useState } from 'react'
import style from '../styles/birthSelect.module.scss'
export default function BirthSelect() {
  const startYear = 1950
  const endYear = 2010
  const [selectedYear, setSelectedYear] = useState('')

  const yearOptions = []

  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    )
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value)
  }

  return (
    <select
      id="birthYear"
      value={selectedYear}
      onChange={handleChange}
      className={style.select}
    >
      {yearOptions}
    </select>
  )
}
