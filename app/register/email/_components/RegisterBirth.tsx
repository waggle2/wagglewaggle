import style from '../styles/RegisterBirth.module.scss'

interface Props {
  prevStep: () => void
}

export default function RegisterBirth({ prevStep }: Props) {
  return (
    <div>
      <h2>회원가입 단계 3</h2>
      {/* 회원가입 양식의 마지막 부분 */}
      <button onClick={prevStep}>이전</button>
      <button onClick={() => {}}>완료</button>
    </div>
  )
}
