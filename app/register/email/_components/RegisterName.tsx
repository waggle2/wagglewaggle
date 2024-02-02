import style from '../styles/registerName.module.scss'
import BaseAvatar from '/public/assets/baseAvatar.svg'
import NameForm from './NameForm'
import { Dispatch, SetStateAction } from 'react'
import { IInputValues } from '@/app/_lib/validate'

interface Props {
  nextStep: () => void
  userTotalDatas: IInputValues
  setUserTotalDatas: Dispatch<SetStateAction<any>>
}

export default function RegisterName({
  nextStep,
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  return (
    <>
      <h2 className={style.title}>
        함께할 이름을 <br />
        적어주세요
      </h2>
      <div className={style.avatarDiv}>
        <BaseAvatar />
      </div>
      <div className={style.formDiv}>
        <NameForm
          nextStep={nextStep}
          userTotalDatas={userTotalDatas}
          setUserTotalDatas={setUserTotalDatas}
        />
      </div>
    </>
  )
}
