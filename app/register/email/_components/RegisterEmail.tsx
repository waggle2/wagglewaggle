import style from '../styles/registerEmail.module.scss'
import AccountForm from './AccountForm'

interface Props {
  nextStep: () => void
}

export default function RegisterEmail({ nextStep }: Props) {
  return (
    <div>
      <h2>
        와글와글의 새 친구로 <br />
        변신 중이에요
      </h2>
      <AccountForm />
      <button onClick={nextStep}>다음</button>
    </div>
  )
}
