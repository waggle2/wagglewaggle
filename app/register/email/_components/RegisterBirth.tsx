import Button from '@/app/_components/button/Button'
import style from '../styles/registerBirth.module.scss'
import BirthSelect from './BirthSelect'

interface Props {
  prevStep: () => void
  nextStep: () => void
}

export default function RegisterBirth({ prevStep, nextStep }: Props) {
  return (
    <form className={style.form}>
      <div className={style.inputDiv}>
        <label htmlFor="">이름</label>
        <input type="text" />
      </div>
      <div className={style.inputDiv}>
        <label htmlFor="">출생년도</label>
        <BirthSelect />
      </div>
      <div className={style.inputDiv}>
        <label htmlFor="">성별</label>
        <input type="text" placeholder="남자" />
        <input type="text" placeholder="여자" />
      </div>
      <Button mainColor="grey" text="시작하기" action={nextStep} />
    </form>
  )
}
