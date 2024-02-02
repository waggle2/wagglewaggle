'use client'

import Button from '@/app/_components/button/Button'
import style from '../styles/registerBirth.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import useFormInput from '@/app/_hooks/useFormInput'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { IInputValues, checkObject } from '@/app/_lib/validate'

interface Props {
  nextStep: () => void
  userTotalDatas: IInputValues
  setUserTotalDatas: Dispatch<SetStateAction<IInputValues>>
}

export default function RegisterBirth({
  nextStep,
  setUserTotalDatas,
  userTotalDatas,
}: Props) {
  const {
    inputFields,
    errors,
    submitting,
    handleSubmit,
    handleChange,
    passable,
    setPassable,
  } = useFormInput({
    realname: '',
    birthYear: '',
    gender: '',
  })

  const startYear = 1950
  const endYear = 2010
  const yearOptions = []

  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    )
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkObject(inputFields)) {
      setPassable(true)
    }
    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ ...userTotalDatas, ...inputFields })
      nextStep()
    }
    return () => setPassable(false)
  }, [errors, submitting])

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputDiv}>
        <label htmlFor="">이름</label>
        <input
          type="text"
          value={inputFields.realname}
          onChange={handleChange}
          name="realname"
        />
      </div>
      <div className={style.inputDiv}>
        <label htmlFor="">출생년도</label>
        <select
          id="birthYear"
          value={inputFields.birthYear}
          onChange={handleChange}
          className={style.select}
          name="birthYear"
        >
          {yearOptions}
        </select>
      </div>
      <div className={cx('inputDiv', 'genderDiv')}>
        <span>성별</span>
        <label htmlFor="man">
          여성
          <input type="radio" id="man" name="gender" />
        </label>
        <label htmlFor="woman">
          남성
          <input type="radio" id="woman" name="gender" />
        </label>
      </div>
      <Button mainColor="grey" text="시작하기" />
    </form>
  )
}
