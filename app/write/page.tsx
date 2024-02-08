import styles from './styles/page.module.scss'
import Content from './_components/Content'
import Warning from '/public/assets/warning.svg'

export default function Write() {
  const category = ['짝사랑', '썸', '연애', '이별', '19']
  const tag = ['수다수다', '공감해줘', '조언해줘', '골라줘']
  return (
    <div className={styles.container}>
      <Content />
      <div className={styles.toggleBox}>
        <span>익명</span>
        <label className={styles.toggle}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.boldLine} />
      <div className={styles.buttonSection}>
        <div className={styles.tagBox}>
          <h6>이런 이야기를 나누고 싶어요</h6>
          <div className={styles.tagText}>
            {category.map((item) => {
              return <div className={styles.tag}>{item}</div>
            })}
          </div>
        </div>
        <div className={styles.tagBox}>
          <h6>이런 답변을 원해요</h6>
          <div className={styles.tagText}>
            {tag.map((item) => {
              return <div className={styles.tag}>{item}</div>
            })}
          </div>
        </div>
      </div>
      <div className={styles.ruleSection}>
        <div>
          <Warning />
          <span>커뮤니티 규칙을 준수해주세요</span>
        </div>
      </div>
    </div>
  )
}
