import style from './button.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)

interface Props {
  text: string
  mainColor: 'green' | 'grey' | 'red' | 'white'
  action?: () => void | undefined | Promise<void>
  isDisabled?: boolean
  fontSize?: number
  borderRadius?: string
  type?: 'submit' | 'button'
}

export default function Button({
  text,
  fontSize = 15,
  mainColor,
  action,
  isDisabled,
  borderRadius,
}: Props) {
  return (
    <button
      onClick={action}
      style={{ fontSize, borderRadius }}
      className={cx('button', mainColor)}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}
