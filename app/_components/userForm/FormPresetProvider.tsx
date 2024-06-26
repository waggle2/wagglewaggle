'use client'
import useFormInput from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { IInputFileds } from '@/app/_types/userFormTypes'
import NameRegister from '@/app/register/email/_components/NameRegister'
import RegisterAgree from '@/app/register/email/_components/RegisterAgree'
import EmailRegister from '@/app/register/email/_components/EmailRegister'
import LoginForm from '@/app/login/_components/LoginForm'
import ConfirmEmail from '@/app/reset-password/_components/ConfirmEmail'
import ChangePassword from '@/app/reset-password/_components/ChangePassword'

interface Props {
  formDataType:
    | 'email'
    | 'name'
    | 'agree'
    | 'login'
    | 'emailConfirm'
    | 'resetPassword'
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
  const isCheckObject = checkObject(inputFields, formDataObject)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isCheckObject) {
      setPassable(true)
    } else {
      setPassable(false)
    }

    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ ...userTotalDatas, ...inputFields })
      nextStep()
    }
    return () => setSubmitting(false)
  }, [errors, submitting, step, isCheckObject])

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
      case 'emailConfirm':
        return <ConfirmEmail {...childrenProps} />
      case 'resetPassword':
        return <ChangePassword {...childrenProps} />
      default:
        null
    }
  }
  return <>{makeBody(formDataType, childrenProps)}</>
}
