import useFormInput, { IInputFileds } from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EmailRegister from './EmailRegister'
import NameRegister from './NameRegister'
import BirthRegister from './BirthRegister'
import RegisterAgree from './RegisterAgree'

interface Props {
  formDataType: 'email' | 'name' | 'agree'
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
  const {
    inputFields,
    errors,
    submitting,
    setSubmitting,
    handleSubmit,
    handleChange,
  } = useFormInput(formDataObject)

  const [passable, setPassable] = useState(false)

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      checkObject(inputFields, formDataObject)
    ) {
      setPassable(true)
    } else {
      setPassable(false)
    }

    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ ...userTotalDatas, ...inputFields })
      nextStep()
    }
    return () => setSubmitting(false)
  }, [errors, submitting, step])

  const childrenProps = {
    inputFields,
    errors,
    handleSubmit,
    handleChange,
    passable,
  }

  const makeBody = (formDataType: string, childrenProps: any) => {
    switch (formDataType) {
      case 'email':
        return <EmailRegister {...childrenProps} />
      case 'name':
        return <NameRegister {...childrenProps} />
      case 'agree':
        return <RegisterAgree {...childrenProps} />
      default:
        null
    }
  }
  return <>{makeBody(formDataType, childrenProps)}</>
}
