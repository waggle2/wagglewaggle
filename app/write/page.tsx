import styles from './styles/page.module.scss'
import Content from './components/Content'
import Footer from './components/Footer'

export default function Write() {
  return (
    <div className={styles.container}>
      <Content />
      <Footer />
    </div>
  )
}
