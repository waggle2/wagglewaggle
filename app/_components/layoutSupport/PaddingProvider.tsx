import style from './PaddingProvider.module.scss'
export default function PaddingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={style.container}>{children}</div>
}
