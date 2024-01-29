import style from '../styles/RegisterBirth.module.scss'

interface Props {
  prevStep: () => void
  nextStep: () => void
}

export default function RegisterBirth({ prevStep, nextStep }: Props) {
  return (
    <div>
      <h2>회원가입 단계 3</h2>
      {/* 회원가입 양식의 마지막 부분 */}
      <button onClick={prevStep}>이전</button>
      <button onClick={nextStep}>다음</button>
    </div>
  )
}
