import style from '../styles/modalRules.module.scss'
import Image from 'next/image'

export default function ModalRules({ onClose }: { onClose: () => void }) {
  return (
    <article className={style.rulesArticle}>
      <header className={style.header}>
        <h2>커뮤니티 규칙</h2>
        <button onClick={onClose}>
          <Image src="/iconClose.svg" alt="close" width={24} height={24} />
        </button>
      </header>
      <div className={style.rulesContainer}>
        <div className={style.rulesDiv}>
          <h3 className={style.rulesTitle}>
            모니터 너머에는 항상 사람이 있어요!
          </h3>
          <ul className={style.rulesList}>
            <li>모든 회원을 존중하고 존댓말을 사용해 주세요.</li>
            <li>
              특정 회원을 지칭하거나 언급하는 것은 가급적 피해주시고, 반드시
              필요한 경우라면 닉네임이나 성함 뒤에 "님"을 붙여주세요.
            </li>
            <li>
              모두의 생각이 같을 수 없습니다. 건전한 비판이라면 존중해 주세요.
              하지만 무조건적인 비난과 인신공격은 금지합니다.
            </li>
            <li>
              욕설, 비속어, 멸칭, 정치적 밈 등의 사용을 금지합니다.(자음 또는
              기호 포함)
            </li>
          </ul>
        </div>
        <div className={style.rulesDiv}>
          <h3 className={style.rulesTitle}>
            모니터 너머에는 항상 사람이 있어요!
          </h3>
          <ul className={style.rulesList}>
            <li>모든 회원을 존중하고 존댓말을 사용해 주세요.</li>
            <li>
              특정 회원을 지칭하거나 언급하는 것은 가급적 피해주시고, 반드시
              필요한 경우라면 닉네임이나 성함 뒤에 "님"을 붙여주세요.
            </li>
            <li>
              모두의 생각이 같을 수 없습니다. 건전한 비판이라면 존중해 주세요.
              하지만 무조건적인 비난과 인신공격은 금지합니다.
            </li>
            <li>
              욕설, 비속어, 멸칭, 정치적 밈 등의 사용을 금지합니다.(자음 또는
              기호 포함)
            </li>
          </ul>
        </div>
        <div className={style.rulesDiv}>
          <h3 className={style.rulesTitle}>
            모니터 너머에는 항상 사람이 있어요!
          </h3>
          <ul className={style.rulesList}>
            <li>모든 회원을 존중하고 존댓말을 사용해 주세요.</li>
            <li>
              특정 회원을 지칭하거나 언급하는 것은 가급적 피해주시고, 반드시
              필요한 경우라면 닉네임이나 성함 뒤에 "님"을 붙여주세요.
            </li>
            <li>
              모두의 생각이 같을 수 없습니다. 건전한 비판이라면 존중해 주세요.
              하지만 무조건적인 비난과 인신공격은 금지합니다.
            </li>
            <li>
              욕설, 비속어, 멸칭, 정치적 밈 등의 사용을 금지합니다.(자음 또는
              기호 포함)
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}
