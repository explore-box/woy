import Head from 'next/head'
import { NextPageWithLayout } from '~/types/app'
import styles from '@styles/pages/forgot-password.module.scss'
import { FlatButton, TextButton } from '@components/button'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, PasswordInput, TextInput } from '@components/form'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import accountService from '@lib/services/account-service'
import { gsap } from 'gsap'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const sendCodeValidation = z.object({
  email: z
    .string()
    .min(1, 'Please fill your email address')
    .email('Opps, your email looks weird'),
})

const confirmValidation = z.object({
  verifyCode: z.string().min(1, 'Please fill your confirmation code'),
})

const resetValidation = z.object({
  newPassword: z.string().min(1, 'Please create your new password'),
  confirmNewPassword: z
    .string()
    .min(1, 'Please fill the password confirmation'),
})

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
  const codeForm = useForm({
    mode: 'onChange',
    resolver: zodResolver(sendCodeValidation),
  })
  const confirmForm = useForm({
    mode: 'onChange',
    resolver: zodResolver(confirmValidation),
  })
  const resetForm = useForm({
    mode: 'onChange',
    resolver: zodResolver(resetValidation),
  })
  const mainRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number>(0)

  const sendResetPasswordCode = useMutation(
    accountService.sendResetPasswordCode,
    {
      onSuccess: () => {
        setActiveStep((step) => step + 1)
      },
      onError: () => {},
    }
  )

  const verifyResetPasswordCode = useMutation(
    accountService.verifyResetPasswordCode,
    {
      onSuccess: () => {
        setActiveStep((step) => step + 1)
      },
      onError: () => {},
    }
  )

  const resetPassword = useMutation<any, any>(
    accountService.verifyResetPasswordCode,
    {
      onSuccess: () => {
        setActiveStep((step) => step + 1)
      },
      onError: (err) => {
        if (err.message == 'auth/password-not-match') {
          resetForm.setError('confirmNewPassword', {
            message: 'Opps, your password not match. Please Reconfirm',
          })
        }
      },
    }
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      // run animation when start
      gsap.from('.image', {
        opacity: 0,
        ease: 'none',
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // run animation based on the step
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          delay: 0,
          defaults: {
            ease: 'none',
            duration: 0.4,
          },
        })
        .from('.content h2', {
          y: 200,
          opacity: 0,
        })
        .from('.content .info', {
          y: 100,
          opacity: 0,
        })
      if (activeStep < 3) {
        tl.from('.content form', {
          y: 200,
          opacity: 0,
          duration: 0.7,
        })
      }

      if (activeStep == 3) {
        tl.from('.content button', {
          y: 200,
          opacity: 0,
          duration: 0.7,
        })
      }
    }, mainRef)

    return () => ctx.revert()
  }, [activeStep])

  return (
    <>
      <Head>
        <title>Reset Your Password | Woy</title>
        <meta
          name="description"
          content="Let's change your master password with the new one. So you're can see stay safe"
        />
      </Head>

      <main ref={mainRef} className={styles.main}>
        <div className={`${styles.content} content`}>
          {/*
            only showing the back button
            if the user is on the first step
           */}
          {activeStep < 1 && (
            <div className={`${styles.back} back`}>
              <TextButton onClick={() => router.back()}>
                <i className="fi fi-rr-arrow-left"></i>
                Back to login
              </TextButton>
            </div>
          )}

          {/* send email code section step */}
          {activeStep == 0 && (
            <>
              <h2>Reset your pasword</h2>

              <span className={`${styles.info} info`}>
                Please fill out the username that related to your account. We
                will send you the code or link to reset your password.
              </span>

              <Form
                context={codeForm}
                onSubmit={(data) => sendResetPasswordCode.mutate(data)}
              >
                <TextInput
                  name="email"
                  placeholder="Your email address"
                  preIcon="fi fi-rr-envelope"
                />

                <FlatButton type="submit" className={styles.submit_button}>
                  Reset Password
                </FlatButton>
              </Form>
            </>
          )}

          {/* confirm section step */}
          {activeStep == 1 && (
            <>
              <h2>Confirm it’s your account</h2>

              <span className={`${styles.info} info`}>
                Please enter the code that we sent to you to verify if this
                account is your. Then we will move further to reset your
                password.
              </span>

              <Form
                context={confirmForm}
                onSubmit={(data) => verifyResetPasswordCode.mutate(data)}
              >
                <TextInput
                  name="verifyCode"
                  placeholder="Your verify code "
                  preIcon="fi fi-rr-paper-plane"
                />

                <FlatButton type="submit" className={styles.submit_button}>
                  Verify
                </FlatButton>
              </Form>
            </>
          )}

          {/* reset password step */}
          {activeStep == 2 && (
            <>
              <h2>Now, reset your password</h2>

              <span className={`${styles.info} info`}>
                Ok, now create your new password to use in your account. Ensure
                to keep this code private and safe. Better save in proper place
                to remember.
              </span>

              <Form
                context={resetForm}
                onSubmit={(data) => resetPassword.mutate(data)}
              >
                <PasswordInput
                  name="newPassword"
                  placeholder="Your new password"
                  preIcon="fi fi-rr-lock"
                />
                <PasswordInput
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  preIcon="fi fi-rr-lock"
                />

                <FlatButton type="submit" className={styles.submit_button}>
                  Create new password
                </FlatButton>
              </Form>
            </>
          )}

          {/* last finish step */}
          {activeStep == 3 && (
            <>
              <h2>🎉 Nice, You’re updated</h2>

              <span className={`${styles.info} info`}>
                Ok, now create your new password to use in your account. Ensure
                to keep this code private and safe. Better save in proper place
                to remember.
              </span>

              <FlatButton link="/signin" className={styles.submit_button}>
                Login to explore
              </FlatButton>
            </>
          )}
        </div>

        <div className={`${styles.image} image`}>
          <picture>
            <Image
              src={'/images/working-laptop.png'}
              alt="Reset Password"
              fill
            />
          </picture>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
