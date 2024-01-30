import style from './button.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)

interface Props {
  text: string
  mainColor: 'green' | 'grey' | 'white'
  action?: () => void | undefined
  fontSize?: number
}

export default function Button({
  text,
  fontSize = 16,
  mainColor,
  action,
}: Props) {
  return (
    <button
      onClick={action}
      style={{ fontSize }}
      className={cx('button', mainColor)}
    >
      {text}
    </button>
  )
}
