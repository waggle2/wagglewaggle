import style from '../styles/registerName.module.scss'

interface Props {
  prevStep: () => void
  nextStep: () => void
}

export default function RegisterName({ prevStep, nextStep }: Props) {
  return (
    <div>
      <h2>회원가입 단계 2</h2>
      <button onClick={prevStep}>이전</button>
      <button onClick={nextStep}>다음</button>
    </div>
  )
}
