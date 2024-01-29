import style from '../styles/AccountForm.module.scss'
export default function AccountForm() {
  return (
    <form>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" />
      </div>
    </form>
  )
}
