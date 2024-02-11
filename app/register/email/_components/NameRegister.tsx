import style from '../styles/nameRegister.module.scss'
import Button from '@/app/_components/button/Button'
import BaseAvatar from '/public/assets/baseAvatar.svg'
import InputGroup from '@/app/_components/userForm/InputGroup'
import { Dispatch, SetStateAction } from 'react'
import api from '@/app/_api/commonApi'
import { IInputFileds } from '@/app/_types/userRegisterTypes'

interface Props {
  inputFields: IInputFileds
  setInputFields: Dispatch<SetStateAction<IInputFileds>>
  errors: IInputFileds
  setErrors: Dispatch<SetStateAction<any>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function NameRegister({
  inputFields,
  setInputFields,
  handleSubmit,
  handleChange,
  errors,
  setErrors,
  passable,
}: Props) {
  async function checkNickname(nickname: string) {
    try {
      const response = await api.get(`/users/nickname-check/${nickname}`)
      if (!response.available) {
        alert('중복된 닉네임입니다.')
        setInputFields({ ...inputFields, isNicknameChecked: false })
        setErrors({
          ...errors,
          nickname: '이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.',
        })
        return
      }
      alert('사용가능한 닉네임입니다.')
      setInputFields({ ...inputFields, isNicknameChecked: true })
      setErrors({ ...errors, nickname: '' })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <h2 className={style.title}>
        함께할 이름과 <br />
        간단한 정보를 입력해주세요
      </h2>
      <div className={style.avatarDiv}>
        <BaseAvatar />
      </div>
      <div className={style.formDiv}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputDiv}>
            <InputGroup
              labelText="닉네임"
              inputProps={{
                type: 'text',
                name: 'nickname',
                onChange: handleChange,
                value: inputFields.nickname ?? '',
                placeholder: '이름을 적어주세요',
                maxLength: 12,
                tabIndex: 1,
                disabled: inputFields.isNicknameChecked,
              }}
              buttonProps={{
                text: inputFields.isNicknameChecked ? '확인완료' : '중복확인',
                active: !!(
                  inputFields.nickname &&
                  !errors.nickname &&
                  !inputFields.isNicknameChecked
                ),
                inactive:
                  !inputFields.nickname ||
                  !!errors.nickname ||
                  !!inputFields.isNicknameChecked,
                onClick: () => {
                  if (inputFields.nickname) checkNickname(inputFields.nickname)
                },
                disabled: inputFields.isNicknameChecked,
                type: 'button',
              }}
              errorMessage={errors.nickname}
              description="특수문자 제외, 4~12자로 입력해주세요."
            />
          </div>
          <div className={style.inputDiv}>
            <InputGroup
              labelText="출생년도"
              inputProps={{
                type: 'text',
                name: 'birthYear',
                onChange: handleChange,
                value: inputFields.birthYear ?? '',
                placeholder: '출생년도를 입력해주세요',
                maxLength: 4,
                tabIndex: 2,
              }}
              errorMessage={errors.birthYear}
              description="응답하신 출생년도는 공개되지 않습니다."
            />
          </div>
          <div className={`${style.inputDiv} ${style.select}`}>
            <h3>성별</h3>
            <div className={style.labelWrapper}>
              <label htmlFor="man">
                남성
                <input
                  type="radio"
                  id="man"
                  name="gender"
                  onChange={handleChange}
                  value="남성"
                  checked={inputFields.gender === '남성'}
                  tabIndex={3}
                />
              </label>
              <label htmlFor="woman">
                여성
                <input
                  type="radio"
                  id="woman"
                  name="gender"
                  onChange={handleChange}
                  value="여성"
                  checked={inputFields.gender === '여성'}
                  tabIndex={4}
                />
              </label>
            </div>
            <div className={style.description}>
              <span>&middot;</span>&nbsp; 응답하신 성별은 공개되지 않습니다.
            </div>
          </div>
          <div className={style.buttonDiv}>
            <Button
              mainColor={passable ? 'green' : 'grey'}
              text="계속하기"
              isDisabled={!passable}
            />
          </div>
        </form>
      </div>
    </>
  )
}
