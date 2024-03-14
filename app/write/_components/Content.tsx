'use client'
import { useEffect, useState } from 'react'
import styles from '../styles/content.module.scss'
import Header from '@/app/_components/common/header/Header'
import LeftArrow from '/public/assets/leftArrow.svg'
import SubmitText from '/public/assets/submitText.svg'
import ButtonSection from './ButtonSection'
import SquarePlus from '/public/assets/squarePlus.svg'
import 'react-quill/dist/quill.snow.css'

import {
  usePostModify,
  usePostWrite,
} from '@/app/_hooks/services/mutations/postWrite'
import Editor from './Editor'
import { useRouter } from 'next/navigation'
import VoteContainer from './VoteContainer'
import BottomSheet from './BottomSheet'
import Modal from '@/app/_components/common/modal/Modal'

interface ContentProps {
  postId?: number
  editTitle?: string
  editContent?: string
  editCategory?: string
  editTag?: string
  editIsAnonymous?: boolean
}
export default function Content({
  postId,
  editTitle,
  editContent,
  editCategory,
  editTag,
  editIsAnonymous,
}: ContentProps) {
  const { mutate } = usePostWrite()
  const { mutate: postModify } = usePostModify(postId as number)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const category = ['짝사랑', '썸', '연애', '이별', '19']
  const tag = ['수다수다', '공감해줘', '조언해줘', '골라줘']
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedTag, setSelectedTag] = useState(0)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const imageUrls: string[] = []
  const [isVote, setIsVote] = useState(true)
  const [isVoteClick, setIsVoteClick] = useState(false)
  const [isModal, setIsModal] = useState(false)
  useEffect(() => {
    if (postId) {
      setTitle(editTitle as string)
      setContent(editContent as string)
      setSelectedCategory(category.indexOf(editCategory as string))
      setSelectedTag(tag.indexOf(editTag as string))
      setIsAnonymous(editIsAnonymous as boolean)
    }
  }, [])
  const handleImageUrls = (htmlString: string) => {
    const srcRegex = /<img[^>]+src="([^">]+)"/g
    let match
    while ((match = srcRegex.exec(htmlString)) !== null) {
      if (match && match.length > 1) {
        imageUrls.push(match[1])
      }
    }
  }
  const modalContent =
    '투표를 삭제하시겠어요?\n 삭제된 투표는 복구할 수 없어요.'
  const router = useRouter()
  return (
    <div
      className={styles.container}
      onClick={() => {
        if (isModal) {
          setIsModal(false)
        }
        if (isVoteClick) {
          setIsVoteClick(false)
        }
      }}
    >
      {isModal && (
        <Modal
          title={<span>투표 삭제</span>}
          content={<div className={styles.modalContent}>{modalContent}</div>}
          buttons={[
            <div className={styles.modalFooter}>
              <div>취소</div>
              <div style={{ color: '#ff184f' }}>삭제하기</div>
            </div>,
          ]}
        />
      )}

      <Header
        leftSection={<LeftArrow />}
        title={'글 작성하기'}
        rightSection={[
          <SubmitText
            onClick={() => {
              handleImageUrls(content)
              const writeData = {
                title,
                content,
                category: category[selectedCategory],
                tag: tag[selectedTag],
                is_anonymous: isAnonymous,
                image_urls: imageUrls,
              }
              if (postId) {
                postModify(writeData)
              } else {
                mutate(writeData)
              }
            }}
          />,
        ]}
      />
      <ButtonSection
        category={category}
        tag={tag}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        editIsAnonymous={editIsAnonymous}
        setIsAnonymous={setIsAnonymous}
      />
      <div className={styles.boldLine} />
      <div className={styles.inputContainer}>
        {!isVote && (
          <div
            className={styles.navButton}
            onClick={() => router.push('/vote')}
          >
            <SquarePlus />
            투표받기
          </div>
        )}
        <input
          className={styles.titleInput}
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        />
        {isVote && <VoteContainer setIsVoteClick={setIsVoteClick} />}
        <div className={styles.contentBox}>
          <Editor initialContent={editContent} setContent={setContent} />
        </div>
      </div>
      {isVoteClick && <BottomSheet setIsModal={setIsModal} />}
    </div>
  )
}
