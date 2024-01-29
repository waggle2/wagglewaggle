import Cat from '/public/assets/catEmoji.svg'
import Bear from '/public/assets/bearEmoji.svg'
import Dog from '/public/assets/dogEmoji.svg'
import Fox from '/public/assets/foxEmoji.svg'
import styles from '../styles/animalEmpathy.module.scss'

export default function AnimalEmpathy() {
  return (
    <div className={styles.container}>
      <div>
        <Cat width="20" height="20" />
        <span>123</span>
      </div>
      <div>
        <Bear width="20" height="20" />
        <span>14</span>
      </div>
      <div>
        <Dog width="20" height="20" />
        <span>2</span>
      </div>
      <div>
        <Fox width="20" height="20" />
        <span>1</span>
      </div>
    </div>
  )
}
