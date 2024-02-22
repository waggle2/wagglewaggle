import Footer from '../_components/common/footer/Footer'
import Header from '../_components/common/header/Header'
import PaddingProvider from '../_components/layoutSupport/PaddingProvider'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PaddingProvider>
        <Header isNoneSidePadding={true} leftSection={<h2>쪽지</h2>} />
      </PaddingProvider>
      {children}
      <Footer />
    </>
  )
}
