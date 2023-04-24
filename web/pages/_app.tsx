import '@styles/globals.scss'
import { AppPropsWithLayout } from '~/types/app'
import { DM_Sans, Poppins } from 'next/font/google'
import { useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Alert } from '@components/modal'

const dmSansFont = DM_Sans({
  weight: ['400', '500', '700'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})
const poppinFont = Poppins({
  weight: ['500', '600', '700'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  // get the app layout
  const layout = Component.layout ?? ((page) => page)
  return (
    <>
      {/* styles for font family */}
      <style jsx global>{`
        :root {
          --font-dm-sans: ${dmSansFont.style.fontFamily};
          --font-poppins: ${poppinFont.style.fontFamily};
        }
      `}</style>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <>
            {layout(<Component {...pageProps} />)}

            {/* top level view component */}
            <Alert />
          </>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
