import styles from './Content.module.scss'

export default function Content() {
  return (
    <div>
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
        <div className={styles.tag}># 공감해줘</div>
        <div className={styles.tag}># 공감해줘</div>
        <div className={styles.tag}># 공감해줘</div>
        <div className={styles.tag}># 공감해줘</div>
        <div className={styles.tag}># 공감해줘</div>
      </div>
      <textarea
        className={styles.contentInput}
        placeholder="함께 나누고 싶은 이야기를 적어주세요"
      />
    </div>
  )
}
