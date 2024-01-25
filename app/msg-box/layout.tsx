import style from './styles/layout.module.scss'
export default function layout({ children }: { children: React.ReactNode }) {
  return <section className={style.container}>{children}</section>
}
