'use client'
import SubmitText2 from '/public/assets/submitText2.svg'
import style from '../styles/messageSender.module.scss'
import {
  FormEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSendMessage } from '@/app/_hooks/services/mutations/message'
import { IMessageRooms } from '@/app/_types/messageTypes'

type Props = {
  messageRoom: IMessageRooms
  loginUserType: 'firstUser' | 'secondUser'
}

export default function MessageSender({ messageRoom, loginUserType }: Props) {
  const [text, setText] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mutation = useSendMessage()

  const fireMutation = () => {
    mutation.mutate(
      { receiver: receiver, content: text },
      {
        onSuccess: () => {
          setText('')
          textareaRef.current?.focus()
        },
        onError: (error) => {
          if (error.code === 400) {
            alert('메시지를 입력해주세요')
            return
          }
          alert('메시지 전송에 실패했습니다')
          return
        },
      },
    )
  }

  const isPassableNewLineInMessage = (text: string) => {
    if (countNewlines(text) >= 6) {
      return false
    }
    return true
  }

  const countNewlines = (text: string) => {
    const newlineCount = (text.match(/\n/g) || []).length

    return newlineCount
  }

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      if (!isPassableNewLineInMessage(text))
        return alert('더 이상 줄을 추가할 수 없습니다.')
      const updatedText = text + '\n'
      setText(updatedText)
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      setText('')
      fireMutation()
      return
    }
  }

  const receiver =
    loginUserType === 'firstUser'
      ? messageRoom.secondUser.id
      : messageRoom.firstUser.id

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setText('')
    fireMutation()
  }

  useEffect(() => {
    handleResizeHeight()
  }, [text])

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor="send" className={style.label}>
        <textarea
          className={style.textContent}
          rows={1}
          id="send"
          value={text}
          placeholder="텍스트를 입력하세요"
          ref={textareaRef}
          wrap="hard"
          onChange={(e) => {
            setText(e.target.value)
            handleResizeHeight()
          }}
          onKeyDown={handleKeyDown}
          maxLength={209}
        ></textarea>
        <button className={style.button}>
          <SubmitText2 width="24" height="24" />
        </button>
      </label>
    </form>
  )
}
