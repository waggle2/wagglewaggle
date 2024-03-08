import styles from '../styles/description.module.scss'

interface DescriptionProps {
  title: string[]
  content: string[]
}
export default function Description({ title, content }: DescriptionProps) {
  return (
    <div className={styles.contentBox}>
      {title.map((item, idx) => {
        return (
          <>
            <div key={idx} className={styles.title}>
              {item}
            </div>
            <div key={idx}>{content[idx]}</div>
            {title.length > 1 && idx === 0 && <div className={styles.line} />}
          </>
        )
      })}
    </div>
  )
}
