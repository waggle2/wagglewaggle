'use client'

import Script from 'next/script'

function KakaoScript() {
  const onLoad = () => {
    const { Kakao } = window
    if (Kakao) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY)
    }
  }

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      defer
      onLoad={onLoad}
    />
  )
}

export default KakaoScript
