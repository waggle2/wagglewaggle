import Button from '@/app/_components/button/Button'
import style from '../styles/registerName.module.scss'
import BaseAvatar from '/public/assets/baseAvatar.svg'
import NameForm from './NameForm'

interface Props {
  prevStep: () => void
  nextStep: () => void
}

export default function RegisterName({ prevStep, nextStep }: Props) {
  return (
    <>
      <h2 className={style.title}>
        함께할 이름을 <br />
        적어주세요
      </h2>
      <div className={style.avatarDiv}>
        <BaseAvatar />
      </div>
      <div className={style.formDiv}>
        <NameForm />
      </div>
      <Button mainColor="grey" text="계속하기" action={nextStep} />
    </>
  )
}
