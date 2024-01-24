import style from './styles/ruleListItem.module.scss'
export default function RuleListItem({ content }: { content: string }) {
  return (
    <label className={style.customCheckbox} htmlFor={content}>
      {content}
      <input type="checkbox"  id={content} />
      <span className={style.checkmark}></span>
    </label>
  )
}
