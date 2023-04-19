import Head from 'next/head'
import { NextPageWithLayout } from '~/types/app'
import styles from '@styles/pages/signin.module.scss'
import Image from 'next/image'
import { Form, TextInput } from '@components/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

const validator = z.object({
  email: z
    .string()
    .min(1, 'Please fill your email address')
    .email('Opps, your email looks weird'),
  password: z.string().min(8, 'Your password at least 8 characters length'),
})

/**
 * # SigninPage
 *
 * the page for help user sign in
 * and log in into the app
 *
 * @returns JSX.Element
 */
const SigninPage: NextPageWithLayout = (): JSX.Element => {
  const form = useForm({ mode: 'onChange', resolver: zodResolver(validator) })

  const emailSigninMutation = useMutation(async () => {})

  return (
    <>
      <Head>
        <title>Sign in | Woy</title>
        <meta
          name="description"
          content="Start explore your awesome password"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h2>Start explore your secret</h2>

          <Form
            context={form}
            onSubmit={(data) => emailSigninMutation.mutate(data)}
          >
            <TextInput name="email" placeholder="Your email address" />
          </Form>
        </div>
        <div className={styles.image}>
          <picture>
            <Image
              src={'/images/heard-music-bike.png'}
              alt="Woy password manager"
              fill
            />
          </picture>
        </div>
      </main>
    </>
  )
}

export default SigninPage
