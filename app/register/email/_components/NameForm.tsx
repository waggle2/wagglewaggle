import useFormInput, { IInputFileds } from '@/app/_hooks/useFormInput'
import style from '../styles/nameForm.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '@/app/_components/button/Button'
import { checkObject } from '@/app/_lib/validate'
import { api } from './AccountForm'

interface Props {
  nextStep: () => void
  setUserTotalDatas: Dispatch<SetStateAction<any>>
  userTotalDatas: IInputFileds
}

export default function NameForm({
  nextStep,
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  const { inputFields, errors, submitting, handleChange, handleSubmit } =
    useFormInput({
      nickname: '',
    })

  const [passable, setPassable] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkObject(inputFields)) {
      return setPassable(true)
    }
    if (Object.keys(errors).length === 0 && submitting) {
      return setUserTotalDatas({ userTotalDatas, ...inputFields })
    }
    return setPassable(false)
  }, [errors, submitting])

  async function checkNickname(nickname: string) {
    try {
      const response = await api.post('/users/nickname-check', {
        nickname: inputFields.nickname,
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3>닉네임</h3>
        <label htmlFor="nickname">
          <input
            type="text"
            placeholder="이름을 적어주세요"
            maxLength={10}
            name="nickname"
            value={inputFields.nickname}
            onChange={handleChange}
          />
          <Button
            mainColor={
              inputFields.nickname && !errors.nickname ? 'green' : 'grey'
            }
            text="중복확인"
            action={() => {
              inputFields.nickname && checkNickname(inputFields.nickname)
            }}
            isDisabled={!(inputFields.nickname && !errors.nickname)}
          />
        </label>
        <span className={style.description}>2~10자의 이름을 사용해주세요</span>
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
        <Button
          mainColor={passable ? 'green' : 'grey'}
          text="계속하기"
          action={nextStep}
          isDisabled={!passable}
        />
      </form>
    </>
  )
}
