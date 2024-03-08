import api from '../_api/commonApi'

export default function userVerify() {
  if (!window.IMP) return
  const { IMP } = window
  IMP.init(process.env.NEXT_PUBLIC_PORTONE_IDENTIFICATION_CODE)
  IMP.certification(
    {
      merchant_uid: `mid_${new Date().getTime()}`,
    },
    callback,
  )
}
async function callback(response: RequestResponse) {
  const { success, error_msg, imp_uid } = response
  if (success) {
    const response = await api.patch(`/users/verification/${imp_uid}`, {})
    if (response.code === 200) {
      const localStorage = window.localStorage
      localStorage.setItem('isVerified', 'true')
    }
    alert(response.message)
  } else {
    alert(`인증 실패: ${error_msg}`)
  }
}
interface ICertification {
  merchant_uid: string
}
interface RequestResponse {
  success?: boolean
  /**
   * ### 결제 실패코드
   * - 결제가 실패하는 경우 PG사 원천코드가 내려갑니다.
   */
  error_code?: string
  /**
   * ### 결제 실패메세지
   * - 결제가 실패하는 경우 PG사 원천메세지가 내려갑니다.
   */
  error_msg?: string
  /**
   * ### 포트원 고유 결제번호
   * - success가 false이고 사전 validation에 실패한 경우, imp_uid는 null일 수 있음
   */
  imp_uid: string
}
export interface Iamport {
  init: (accountID: string | undefined) => void
  certification: (
    params: ICertification,
    callback?: (response: RequestResponse) => void,
  ) => void
}
declare global {
  interface Window {
    IMP?: Iamport
  }
}
