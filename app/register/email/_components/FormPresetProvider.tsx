import useFormInput, { IInputFileds } from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EmailRegister from './EmailRegister'
import NameRegister from './NameRegister'
import BirthRegister from './BirthRegister'

interface Props {
  formDataType: 'email' | 'name'
  formDataObject: IInputFileds
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
  nextStep: () => void
  step: number
}

export default function FormPresetProvider({
  formDataType,
  formDataObject,
  userTotalDatas,
  setUserTotalDatas,
  nextStep,
  step,
}: Props) {
  const { inputFields, errors, submitting, handleSubmit, handleChange } =
    useFormInput(formDataObject)

  const [passable, setPassable] = useState(false)

  useEffect(() => {
    setPassable(false)
  }, [])

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      checkObject(inputFields, formDataObject)
    ) {
      setPassable(true)
    }
    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ ...userTotalDatas, ...inputFields })
      nextStep()
    }
  }, [errors, submitting])

  const childrenProps = {
    inputFields,
    errors,
    handleSubmit,
    handleChange,
    passable,
  }

  switch (formDataType) {
    case 'email':
      return <EmailRegister {...childrenProps} />
    case 'name':
      return <NameRegister {...childrenProps} />
    default:
      null
  }
}
