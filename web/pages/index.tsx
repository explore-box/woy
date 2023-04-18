import Head from 'next/head'
import { NextPageWithLayout } from '~/types/app'

const HomePage: NextPageWithLayout = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Free forever password manager</title>
        <meta
          name="description"
          content="Create your own password info, card, note, wifi in a single place"
        />
      </Head>

      <main></main>
    </>
  )
}

export default HomePage
