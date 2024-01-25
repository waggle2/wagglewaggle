import { useEffect, useRef } from 'react'
import style from '../styles/modal.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
  modalType: 'main' | 'delete' | 'block' | 'report' | 'rules'
  onClose: () => void
}

export default function Modal({
  modalType,
  isOpen,
  children,
  onClose,
}: ModalProps) {
  if (!isOpen) return null
  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalContentRef.current?.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className={cx('modal', modalType)} ref={modalRef}>
      <div className={cx('modalContent', modalType)} ref={modalContentRef}>
        {children}
      </div>
    </div>
  )
}
