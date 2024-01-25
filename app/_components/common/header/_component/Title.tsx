import style from './icon.module.css'

export default function Title({ title }: { title: string }) {
  return <div className={style.container}>{title}</div>
}
