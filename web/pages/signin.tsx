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
import { useRouter } from 'next/router'
import useAlert from '@lib/hooks/use-alert'
import axios from 'axios'

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
  const router = useRouter()
  const mainRef = useRef<HTMLElement>(null)
  const form = useForm({ mode: 'onChange', resolver: zodResolver(validator) })
  const alert = useAlert()

  const emailSignin = useMutation<any, any>(
    async (data: any) => {
      try {
        await axios.post('/api/auth/local', {
          email: data.email,
          password: data.password,
        })
      } catch (error: any) {
        throw error.response.data
      }
    },
    {
      onSuccess: () => {
        alert.show({
          type: 'success',
          title: 'Log in',
          description: "Now you're signin into the app",
        })

        router.push('/app')
      },
      onError: (error) => {
        if (error.message == 'auth/invalid-password') {
          form.setError('password', {
            message: `Opps, your password look weird`,
          })
        } else {
          alert.show({
            type: 'error',
            title: 'Failed',
            description: 'Opps, something error when login',
          })
        }
      },
    }
  )

  const googleSignin = useMutation<any, any>(async () => {
    router.replace('/api/auth/google')
  })

  const githubSignin = useMutation(async () => {
    router.replace('/api/auth/github')
  })

  // showing error message
  // when something happen with oauth method
  useEffect(() => {
    const { status, strategy } = router.query
    if (status == 'fail') {
      if (strategy == 'google') {
        alert.show({
          type: 'error',
          title: 'Failed',
          description: 'Opps, something happen when try to signin using google',
        })
      }

      if (strategy == 'github') {
        alert.show({
          type: 'error',
          title: 'Failed',
          description: 'Opps, something happen when try to signin using github',
        })
      }
    }
  }, [router.query])

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
          duration: 0.7,
          ease: 'none',
        })
        .from(['.back', 'h2', 'form', '.actions', '.option-label'], {
          y: 100,
          opacity: 0,
          duration: 1.2,
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
            <TextButton onClick={() => router.back()}>
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

            <FlatButton
              type="submit"
              className={styles.submit_button}
              disabled={emailSignin.isLoading}
              processed={emailSignin.isLoading}
            >
              {emailSignin.isLoading ? <>Signing in</> : <>Sign in Now</>}
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
