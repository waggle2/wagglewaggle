import Image from 'next/image'
import style from './styles/messageSender.module.scss'

export default function MessageSender() {
  return (
    <form className={style.form}>
      <label htmlFor="send" className={style.label}>
        <input type="text" id="send" placeholder="텍스트를 입력하세요" />
        <button>
          <Image
            src="/assets/submitText2.svg"
            alt="send"
            width={14.37}
            height={14.38}
          />
        </button>
      </label>
    </form>
  )
}
