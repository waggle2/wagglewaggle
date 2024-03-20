import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import React from 'react'
import style from '../styles/schedulePicker.module.scss'
import { formatDate } from '@/app/_lib/formatDate'
import { useRecoilState } from 'recoil'
import { voteState } from '@/app/_recoil/atoms/voteState'

export default function SchedulePicker() {
  const [dates, setDates] = useState<Dayjs | null>(null)
  const [voteItems, setVoteItems] = useRecoilState(voteState)

  const disabledDate = (current: Dayjs) => {
    const today = dayjs()
    const tomorrow = today.add(1, 'day')
    const tooOld = current.isBefore(tomorrow, 'day')
    if (!dates) {
      return tooOld
    }
    return !!tooOld
  }

  const onChange = (date: Dayjs | null, dateString: string) => {
    if (date) {
      setVoteItems({
        ...voteItems,
        endedDate: dateString,
      })
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
        defaultValue={
          voteItems.endedDate === ''
            ? dayjs(today).add(1, 'day')
            : dayjs(voteItems.endedDate)
        }
        onChange={onChange}
      />
    </div>
  )
}
