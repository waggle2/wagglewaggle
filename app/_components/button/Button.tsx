import style from './button.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)

interface Props {
  text: string
  mainColor: 'green' | 'grey' | 'red'
  action?: () => void | undefined
  fontSize?: number
  isDisabled?: boolean
}

export default function Button({
  text,
  fontSize = 16,
  mainColor,
  action,
  isDisabled,
}: Props) {
  return (
    <button
      onClick={action}
      style={{ fontSize }}
      className={cx('button', mainColor)}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}
