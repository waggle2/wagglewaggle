'use client'
import { useState } from 'react'
import styles from '../styles/content.module.scss'
import Header from '@/app/_components/common/header/page'
import LeftArrow from '/public/assets/leftArrow.svg'
import SubmitText from '/public/assets/submitText.svg'
import ButtonSection from './ButtonSection'
import 'react-quill/dist/quill.snow.css'

import { usePostWrite } from '@/app/_hooks/services/mutations/postWrite'
import Editor from './Editor'

export default function Content() {
  const { mutate } = usePostWrite()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const category = ['짝사랑', '썸', '연애', '이별', '19']
  const tag = ['수다수다', '공감해줘', '조언해줘', '골라줘']
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedTag, setSelectedTag] = useState(0)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  return (
    <div className={styles.container}>
      <Header
        leftSection={<LeftArrow />}
        title={'글 작성하기'}
        rightSection={[
          <SubmitText
            onClick={() => {
              const writeData = {
                title,
                content,
                category: category[selectedCategory],
                tag: tag[selectedTag],
                is_anonymous: isAnonymous,
                image_urls: imageUrls,
              }
              mutate(writeData)
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
        setIsAnonymous={setIsAnonymous}
      />
      <div className={styles.boldLine} />
      <div className={styles.inputContainer}>
        <input
          className={styles.titleInput}
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.contentBox}>
          <Editor setContent={setContent} setImageUrls={setImageUrls} />
        </div>
      </div>
    </div>
  )
}
