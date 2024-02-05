import { IInputFileds } from '@/app/_hooks/useFormInput'
import style from '../styles/nameRegister.module.scss'
import Button from '@/app/_components/button/Button'
import { api } from './EmailRegister'
import BaseAvatar from '/public/assets/baseAvatar.svg'

interface Props {
  inputFields: IInputFileds
  errors: IInputFileds
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function NameRegister({
  inputFields,
  handleSubmit,
  handleChange,
  errors,
  passable,
}: Props) {
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
      <h2 className={style.title}>
        함께할 이름을 <br />
        적어주세요
      </h2>
      <div className={style.avatarDiv}>
        <BaseAvatar />
      </div>
      <div className={style.formDiv}>
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
          <span className={style.description}>
            2~10자의 이름을 사용해주세요
          </span>
          {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname}</p>}
          <Button
            mainColor={passable ? 'green' : 'grey'}
            text="계속하기"
            isDisabled={!passable}
          />
        </form>
      </div>
    </>
  )
}
