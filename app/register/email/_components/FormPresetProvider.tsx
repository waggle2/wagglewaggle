import useFormInput, { IInputFileds } from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { Dispatch, SetStateAction, useEffect } from 'react'
import EmailRegister from './EmailRegister'
import NameRegister from './NameRegister'
import BirthRegister from './BirthRegister'

interface Props {
  formDataType: 'email' | 'name' | 'birth'
  formDataObject: IInputFileds
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
  nextStep: () => void
}

export default function FormPresetProvider({
  formDataType,
  formDataObject,
  userTotalDatas,
  setUserTotalDatas,
  nextStep,
}: Props) {
  const {
    inputFields,
    errors,
    submitting,
    handleSubmit,
    handleChange,
    passable,
    setPassable,
  } = useFormInput(formDataObject)

  const childrenProps = {
    inputFields,
    errors,
    handleSubmit,
    handleChange,
    passable,
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkObject(inputFields)) {
      setPassable(true)
    }
    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ ...userTotalDatas, ...inputFields })
      setPassable(false)
      nextStep()
    }
    return () => setPassable(false)
  }, [errors, submitting])

  switch (formDataType) {
    case 'email':
      return <EmailRegister {...childrenProps} />
    case 'name':
      return <NameRegister {...childrenProps} />
    case 'birth':
      return <BirthRegister {...childrenProps} />
    default:
      null
  }
}
