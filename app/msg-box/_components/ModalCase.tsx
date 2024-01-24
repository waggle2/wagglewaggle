import style from './styles/modalCase.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
type ModalCaseProps = {
  title: string
  nextTitle?: string
  description: string
  onClose: () => void
  actionButtonName: string
  onAction?: (f: Function) => void
}

export default function ModalCase({
  title,
  nextTitle,
  description,
  onClose,
  actionButtonName,
  onAction,
}: ModalCaseProps) {
  return (
    <div className={style.modalCaseDiv}>
      <p className={style.title}>{title}</p>
      {nextTitle && <p className={cx('title', 'nextTitle')}>{nextTitle}</p>}
      <p className={style.description}>{description}</p>
      <button className={style.actionButton}>{actionButtonName}</button>
      <button className={style.cancelButton} onClick={onClose}>
        취소
      </button>
    </div>
  )
}
