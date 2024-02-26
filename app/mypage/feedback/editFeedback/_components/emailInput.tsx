import style from './emailInput.module.scss'

import { ChangeEventHandler } from 'react'

type emailInputProps = {
  placeholder: string
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  title?: string
}
type contentProps = {
  title: string
  content: string
  handleTitleChange: ChangeEventHandler<HTMLInputElement>
  handleContentChange: ChangeEventHandler<HTMLTextAreaElement>
}

export default function EmailInput({
  placeholder,
  onChange,
  text,
  title,
}: emailInputProps) {
  return (
    <div className={style.wrapper}>
      <p className={style.email}>{title}</p>
      <input
        className={style.input}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={text}
      />
    </div>
  )
}

export function FeedbackContent({
  title,
  content,
  handleTitleChange,
  handleContentChange,
}: contentProps) {
  return (
    <div className={style.container}>
      <input
        className={style.title}
        placeholder="제목을 입력하세요."
        defaultValue={title}
        onChange={handleTitleChange}
      />
      <textarea
        className={style.content}
        placeholder="건의사항을 적어주세요."
        defaultValue={content}
        onChange={handleContentChange}
      />
    </div>
  )
}
