import '@styles/globals.scss'
import { AppPropsWithLayout } from '~/types/app'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // get the app layout
  const layout = Component.layout ?? ((page) => page)
  return <>{layout(<Component {...pageProps} />)}</>
}
