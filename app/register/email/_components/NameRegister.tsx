import { IInputFileds } from '@/app/_hooks/useFormInput'
import style from '../styles/nameRegister.module.scss'
import Button from '@/app/_components/button/Button'
import { api } from './EmailRegister'
import BaseAvatar from '/public/assets/baseAvatar.svg'
import InputGroup from '@/app/_components/userForm/InputGroup'

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
              }}
              buttonProps={{
                text: '중복확인',
                active: !!(inputFields.nickname && !errors.nickname),
                inactive: !(inputFields.nickname && !errors.nickname),
                onClick: () => {
                  inputFields.nickname && checkNickname(inputFields.nickname)
                },
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
                  value="man"
                  checked={inputFields.gender === 'man'}
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
                  value="woman"
                  checked={inputFields.gender === 'woman'}
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
