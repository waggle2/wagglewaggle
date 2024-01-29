import style from '../styles/registerName.module.scss'

interface Props {
  nextStep: () => void
}

export default function RegisterName({ nextStep }: Props) {
  return (
    <div>
      <h2>회원가입 단계 1</h2>
      <button onClick={nextStep}>다음</button>
    </div>
  )
}
