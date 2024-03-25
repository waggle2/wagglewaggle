import Header from '../_components/common/header/Header'
import Content from './_components/Content'
import styles from './styles/page.module.scss'
import LeftArrow from '/public/assets/leftArrow.svg'

export default function MindTest() {
  return (
    <>
      <Header
        leftSection={<LeftArrow />}
        title="나의 연애 성향은?"
        rightSection={[<div style={{ padding: '12px' }} />]}
      />
      <div className={styles.container}>
        <Content />
      </div>
    </>
  )
}
