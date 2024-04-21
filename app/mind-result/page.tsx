import styles from './styles/page.module.scss'
import LeftArrow from '/public/assets/leftArrow.svg'
import Header from '../_components/common/header/Header'
import dynamic from 'next/dynamic'
const Content = dynamic(() => import('./_components/Content'), { ssr: false })
export default function MindResult() {
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
