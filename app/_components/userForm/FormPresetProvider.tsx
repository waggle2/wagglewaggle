import useFormInput from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { IInputFileds } from '@/app/_types/userFormTypes'
import NameRegister from '@/app/register/email/_components/NameRegister'
import RegisterAgree from '@/app/register/email/_components/RegisterAgree'
import EmailRegister from '@/app/register/email/_components/EmailRegister'
import LoginForm from '@/app/login/_components/LoginForm'

interface Props {
  formDataType: 'email' | 'name' | 'agree' | 'login'
  formDataObject: IInputFileds
  userTotalDatas?: IInputFileds
  setUserTotalDatas?: Dispatch<SetStateAction<IInputFileds>>
  nextStep?: () => void
  step?: number
}

export default function FormPresetProvider({
  formDataType,
  formDataObject,
  userTotalDatas = {},
  setUserTotalDatas = () => {},
  nextStep = () => {},
  step = 0,
}: Props) {
  const {
    inputFields,
    setInputFields,
    errors,
    setErrors,
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
    setInputFields,
    errors,
    setErrors,
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
      case 'login':
        return <LoginForm {...childrenProps} />
      default:
        null
    }
  }
  return <>{makeBody(formDataType, childrenProps)}</>
}
