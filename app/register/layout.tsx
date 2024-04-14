import PaddingProvider from '../_components/layoutSupport/PaddingProvider'
import style from './styles/layout.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={style.container}>
      <PaddingProvider>{children}</PaddingProvider>
    </section>
  )
}
