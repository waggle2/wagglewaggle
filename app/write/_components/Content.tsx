'use client'
import { useRef, useState } from 'react'
import styles from '../styles/content.module.scss'
import Toolbar from './Toolbar'
import VoteContainer from './VoteContainer'
import ImageContainer from './ImageContainer'
import Header from '@/app/_components/common/header/page'
import LeftArrow from '/public/assets/leftArrow.svg'
import SubmitText from '/public/assets/submitText.svg'

export default function Content() {
  const [isToggle, setIsToggle] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const [isVote, setIsVote] = useState(false)
  const [content, setContent] = useState('')
  const textarea = useRef<HTMLTextAreaElement | null>(null)
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'
      textarea.current.style.height = textarea.current.scrollHeight + 'px'
    }
  }
  return (
    <div className={styles.container}>
      <Header
        leftSection={<LeftArrow />}
        title={'글 작성하기'}
        rightSection={[<SubmitText />]}
        isNoneSidePadding
      />
      <input className={styles.titleInput} placeholder="제목" />
      <div className={styles.contentBox}>
        <Toolbar setIsImage={setIsImage} setIsVote={setIsVote} />
        {isVote && <VoteContainer setIsVote={setIsVote} />}
        {isImage && <ImageContainer setIsImage={setIsImage} />}
        <textarea
          ref={textarea}
          rows={1}
          className={styles.contentInput}
          placeholder="함께 나누고 싶은 이야기를 적어주세요"
          onChange={(e) => {
            setContent(e.target.value)
            handleResizeHeight()
          }}
        />
      </div>
    </div>
  )
}
