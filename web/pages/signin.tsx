import Head from 'next/head'
import { NextPageWithLayout } from '~/types/app'
import styles from '@styles/pages/signin.module.scss'
import Image from 'next/image'
import { Form, PasswordInput, TextInput } from '@components/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { FlatButton, TextButton } from '@components/button'
import { gsap } from 'gsap'

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
  const mainRef = useRef<HTMLElement>(null)
  const form = useForm({ mode: 'onChange', resolver: zodResolver(validator) })

  const emailSignin = useMutation(async () => {})

  const googleSignin = useMutation(async () => {})

  const githubSignin = useMutation(async () => {})

  useEffect(() => {
    const ctx = gsap.context(() => {
      // squence animation
      gsap
        .timeline({
          delay: 0.1,
          defaults: {
            ease: 'back',
            duration: 0.4,
          },
        })
        .from('.image', {
          opacity: 0,
          duration: 1.2,
          ease: 'none',
        })
        .from(['.back', 'h2', 'form', 'actions'], {
          y: 100,
          opacity: 0,
        })
    }, mainRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Sign in | Woy</title>
        <meta
          name="description"
          content="Start explore your awesome password"
        />
      </Head>

      <main ref={mainRef} className={styles.main}>
        <div className={styles.content}>
          <div className={`${styles.back} back`}>
            <TextButton>
              <i className="fi fi-rr-arrow-left"></i>
              Back
            </TextButton>
          </div>

          <h2>Start explore your secret</h2>

          <Form context={form} onSubmit={(data) => emailSignin.mutate(data)}>
            <TextInput
              name="email"
              placeholder="Your email address"
              preIcon="fi fi-rr-user"
            />

            <PasswordInput
              name="password"
              placeholder="Your password"
              preIcon="fi fi-rr-lock"
            />
            <div className={styles.forgot}>
              <TextButton link="/forgot-password">Forgot Password</TextButton>
            </div>

            <FlatButton type="submit" className={styles.submit_button}>
              Sign in Now
            </FlatButton>
          </Form>

          <span className={`${styles.other_options_label} option-label`}>
            Or sign in using
          </span>

          <div className={`${styles.actions} actions`}>
            <FlatButton onClick={() => googleSignin.mutate()}>
              <i className="fi fi-brands-google"></i>
              Using Google
            </FlatButton>
            <FlatButton onClick={() => githubSignin.mutate()}>
              <i className="fi fi-brands-github"></i>
              Using Github
            </FlatButton>
          </div>
        </div>
        <div className={`${styles.image} image`}>
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
