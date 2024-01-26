import style from '../styles/modalMenu.module.scss'

interface Props {
  onBlock: () => void
  onReport: () => void
  onDelete: () => void
  onClose: () => void
}

export default function ModalMenu({
  onBlock,
  onReport,
  onDelete,
  onClose,
}: Props) {
  const handleBlock = () => onBlock
  const handleReport = () => onReport
  const handleDelete = () => onDelete
  const handleClose = () => onClose

  return (
    <ul className={style.mainList}>
      <li onClick={handleBlock}>차단하기</li>
      <li onClick={handleReport}>신고하기</li>
      <li className={style.delete} onClick={handleDelete}>
        쪽지 내용 전체 삭제
      </li>
      <li className={style.cancel} onClick={handleClose}>
        취소
      </li>
    </ul>
  )
}
