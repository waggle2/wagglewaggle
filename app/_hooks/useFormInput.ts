import { validate, IErrors } from '@/app/_lib/validate'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

export interface IInputFileds {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
  realname?: string
  birthYear?: string
  gender?: 'man' | 'woman' | ''
}

export default function useFormInput(initialValues: IInputFileds) {
  const [inputFields, setInputFields] = useState<IInputFileds>({
    ...initialValues,
  })
  const [errors, setErrors] = useState<IErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    const updatedInputFields = { ...inputFields, [name]: value }
    setInputFields(updatedInputFields)

    const validationErrors = validate(updatedInputFields)
    setErrors(validationErrors)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
  }

  return {
    inputFields,
    errors,
    submitting,
    handleSubmit,
    handleChange,
  }
}
