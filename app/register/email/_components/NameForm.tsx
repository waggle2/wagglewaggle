import useFormInput from '@/app/_hooks/useFormInput'
import style from '../styles/nameForm.module.scss'
import { useEffect } from 'react'
export default function NameForm() {
  const {
    inputFields,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    finishSubmit,
  } = useFormInput({
    nickname: '',
  })

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
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
          <button>중복확인</button>
        </label>
        <span className={style.description}>2~10자의 이름을 사용해주세요</span>
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
      </form>
    </>
  )
}
