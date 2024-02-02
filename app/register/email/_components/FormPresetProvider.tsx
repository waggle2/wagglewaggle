import useFormInput from '@/app/_hooks/useFormInput'
import { checkObject } from '@/app/_lib/validate'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export default function FormPresetProvider({ children }: Props) {
  const {
    childrenProps: {
      inputFields,
      errors,
      submitting,
      handleSubmit,
      handleChange,
      passable,
      setPassable,
    },
  } = useFormInput({
    email: '',
    emailCheck: '',
    password: '',
    passwordCheck: '',
  })

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

  return <>{children}</>
}
