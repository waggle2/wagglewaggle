import PaddingProvider from '../_components/layoutSupport/PaddingProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PaddingProvider>{children}</PaddingProvider>
}
