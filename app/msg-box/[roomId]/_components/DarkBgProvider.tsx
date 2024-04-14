import style from '../styles/darkBgProvider.module.scss'
export default function DarkBgProvider({
  children,
}: {
  children: React.ReactElement
}) {
  return <div className={style.container}>{children}</div>
}
