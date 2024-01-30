import Button from '@/app/_components/button/Button'
import style from '../styles/accountForm.module.scss'
import InputGroup from './InputGroup'
export default function AccountForm() {
  return (
    <form className={style.form}>
      <div className={style.inputGroupDiv}>
        <InputGroup
          title="이메일"
          placeholder="이메일을 적어주세요"
          isButton={true}
          buttonText="인증하기"
          inputType="email"
        />
      </div>
      <div className={style.inputGroupDiv}>
        <InputGroup
          title="인증코드"
          placeholder="인증코드를 확인해주세요"
          isButton={true}
          buttonText="인증확인"
          inputType="number"
        />
      </div>
      <div className={style.inputGroupDiv}>
        <InputGroup
          title="비밀번호"
          placeholder="비밀번호를 적어주세요"
          isButton={false}
          inputType="password"
        />
      </div>
      <div className={style.inputGroupDiv}>
        <InputGroup
          title="비밀번호 확인"
          placeholder="비밀번호를 한번 더 적어주세요"
          isButton={false}
          inputType="password"
        />
      </div>
    </form>
  )
}
