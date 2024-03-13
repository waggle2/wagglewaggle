import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import React from 'react'
import style from '../styles/schedulePicker.module.scss'
const { RangePicker } = DatePicker

type RangeValue = [Dayjs | null, Dayjs | null] | null

export default function SchedulePicker() {
  const [dates, setDates] = useState<RangeValue>(null)
  const [value, setValue] = useState<RangeValue>(null)

  const disabledDate = (current: Dayjs) => {
    const today = dayjs()
    const tooOld = current.isBefore(today, 'day')
    if (!dates) {
      return tooOld
    }
    return !!tooOld
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null])
    } else {
      setDates(null)
    }
  }
  return (
    <div className={style.container}>
      <DatePicker
        disabledDate={disabledDate}
        variant="borderless"
        dropdownClassName={style.firstDropdown}
      />
      <span>-</span>
      <DatePicker
        disabledDate={disabledDate}
        variant="borderless"
        dropdownClassName={style.secondDropdown}
      />
    </div>
  )
}
