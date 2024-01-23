import styles from './page.module.scss'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'

export default function Write() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Content />
      <Footer />
    </div>
  )
}
