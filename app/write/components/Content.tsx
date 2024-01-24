'use client'
import { useState } from 'react'
import styles from '../styles/content.module.scss'
import NavBar from './NavBar'
import Dropdown from './Dropdown'
import Footer from './Footer'
import VoteContainer from './VoteContainer'
export default function Content() {
  const [isToggle, setIsToggle] = useState(false)
  const [isImage, setIsImage] = useState(false)
  const [isVote, setIsVote] = useState(false)
  const [content, setContent] = useState('')
  const tag = ['# 공감해줘', '# 조언해줘', '# 골라줘', '# 수다수다']
  return (
    <div>
      <NavBar isToggle={isToggle} setIsToggle={setIsToggle} />
      {isToggle && <Dropdown />}
      <input className={styles.titleInput} placeholder="제목" />
      <div className={styles.infoBox}>
        <span>어떤 말을 듣고싶나요?</span>
        <div className={styles.toggleBox}>
          <span>익명</span>
          <label className={styles.toggle}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
      <div className={styles.tagBox}>
        {tag.map((item, idx) => (
          <div className={styles.tag} key={idx}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.contentBox}>
        {isVote && <VoteContainer setIsVote={setIsVote} />}
        <textarea
          className={styles.contentInput}
          placeholder="함께 나누고 싶은 이야기를 적어주세요"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Footer setIsImage={setIsImage} setIsVote={setIsVote} />
    </div>
  )
}
