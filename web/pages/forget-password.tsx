import Head from 'next/head'
import { NextPageWithLayout } from '~/types/app'

/**
 * # ForgotPasswordPage
 *
 * Page to handle the reset password
 * the page will contin several step
 * including email input, verify, change password, and finish
 *
 * @returns JSX.Element
 */
const ForgotPasswordPage: NextPageWithLayout = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Reset Your Password | Woy</title>
        <meta
          name="description"
          content="Let's change your master password with the new one. So you're can see stay safe"
        />
      </Head>

      <main className=""></main>
    </>
  )
}

export default ForgotPasswordPage
