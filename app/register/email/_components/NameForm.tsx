import style from '../styles/nameForm.module.scss'
import InputGroup from './InputGroup'
export default function NameForm() {
  return (
    <>
      <InputGroup
        inputType="text"
        placeholder="댕댕이"
        buttonText="중복확인"
        title="닉네임"
      />
      <span className={style.description}>2~10자의 이름을 사용해주세요</span>
    </>
  )
}
