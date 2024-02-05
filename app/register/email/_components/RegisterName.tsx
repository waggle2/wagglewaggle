import style from '../styles/registerName.module.scss'
import NameForm from './NameRegister'
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
      <NameForm
        nextStep={nextStep}
        userTotalDatas={userTotalDatas}
        setUserTotalDatas={setUserTotalDatas}
      />
    </>
  )
}
