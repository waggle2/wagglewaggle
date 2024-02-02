import { validate, IErrors } from '@/app/_lib/validate'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'

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
  const [passable, setPassable] = useState(false)

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
    childrenProps: {
      inputFields,
      errors,
      submitting,
      handleChange,
      handleSubmit,
      passable,
      setPassable,
    },
  }
}
