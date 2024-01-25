'use client'
import SubmitText2 from '/public/assets/submitText2.svg'
import style from '../styles/messageSender.module.scss'
import { useRef, useState } from 'react'

export default function MessageSender() {
  const [text, setText] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  return (
    <form className={style.form}>
      <label htmlFor="send" className={style.label}>
        <textarea
          className={style.textContent}
          rows={1}
          id="send"
          placeholder="텍스트를 입력하세요"
          ref={textareaRef}
          onChange={(e) => {
            setText(e.target.value)
            handleResizeHeight()
          }}
          maxLength={311}
        ></textarea>
        <button className={style.button}>
          <SubmitText2 width="24" height="24" />
        </button>
      </label>
    </form>
  )
}
