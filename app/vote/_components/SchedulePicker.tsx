import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import React from 'react'
import style from '../styles/schedulePicker.module.scss'
import { formatDate } from '@/app/_lib/formatDate'
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
  const today = new Date()
  const todayString = today.toISOString().substring(0, 10)
  return (
    <div className={style.container}>
      <DatePicker
        style={{ width: '100%' }}
        disabledDate={disabledDate}
        variant="borderless"
        placeholder={formatDate(todayString)}
      />
    </div>
  )
}
