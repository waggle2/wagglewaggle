import styles from './styles/page.module.scss'
import Content from './_components/Content'
import LeftArrow from '/public/assets/leftArrow.svg'
import Header from '../_components/common/header/page'

export default function MindResult() {
  return (
    <div className={styles.container}>
      <Header leftSection={<LeftArrow />} title="나의 연애 성향은?" />
      <Content />
    </div>
  )
}
