import style from '../styles/RegisterAgree.module.scss'

interface Props {
  prevStep: () => void
}

export default function RegisterAgree({ prevStep }: Props) {
  return (
    <div>
      <h2>회원가입 단계 4</h2>
      <button onClick={prevStep}>이전</button>
    </div>
  )
}
