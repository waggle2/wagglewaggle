'use client'
import Button from '@/app/_components/button/Button'
import style from '../styles/registerAgree.module.scss'
import { useRouter } from 'next/navigation'

interface Props {
  prevStep: () => void
}

export default function RegisterAgree() {
  const router = useRouter()

  return (
    <div>
      <h2 className={style.title}>
        시작하기 위한
        <br />
        마지막 단계에요!
      </h2>
      <div className={style.inputWrapper}>
        <div className={style.inputDiv}>
          <input type="checkbox" />
          <label htmlFor="">약관 전체동의</label>
        </div>
        <div className={style.inputDiv}>
          <input type="checkbox" />
          <label htmlFor="">이용약관 동의(필수)</label>
        </div>
        <div className={style.inputDiv}>
          <input type="checkbox" />
          <label htmlFor="">개인정보 수집 및 이용동의(필수)</label>
        </div>
        <Button
          mainColor="grey"
          text="시작하기"
          action={() => router.push('/')}
        />
      </div>
    </div>
  )
}
