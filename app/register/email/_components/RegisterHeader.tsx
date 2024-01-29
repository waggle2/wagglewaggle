import style from '../styles/registerHeader.module.scss'
import LeftArrow from '/public/assets/leftArrow.svg'
import Xmark from '/public/assets/xmark.svg'

interface Props {
  title?: string
}

export default function RegisterHeader({ title = '회원가입' }: Props) {
  return (
    <header className={style.header}>
      <span>
        <LeftArrow />
      </span>
      <h2>{title}</h2>
      <span>
        <Xmark width={24} height={24} />
      </span>
    </header>
  )
}
