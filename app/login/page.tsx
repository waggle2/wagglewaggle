import LoginHeader from './_components/LoginHeader'
import LoginMenu from './_components/LoginMenu'
import LoginSocial from './_components/LoginSocial'
import styles from './page.module.scss'
import FormPresetProvider from '../_components/userForm/FormPresetProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {}

export default function page() {
  return (
    <section className={styles.section}>
      <LoginHeader />
      <FormPresetProvider
        formDataType="login"
        formDataObject={{
          loginEmail: '',
          loginPassword: '',
        }}
      />
      <div className={styles.hrDiv}>
        <hr />
        <span>OR</span>
      </div>
      <LoginSocial />
      <LoginMenu />
    </section>
  )
}
