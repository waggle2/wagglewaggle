import { validate } from '@/app/_lib/validate'
import { ChangeEvent, FormEvent, useState } from 'react'

export interface IInputFileds {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
  birthYear?: string
  gender?: 'man' | 'woman' | ''
}

export interface IErrors {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
  }

  return {
    inputFields,
    errors,
    submitting,
    setSubmitting,
    handleChange,
    handleSubmit,
  }
}
