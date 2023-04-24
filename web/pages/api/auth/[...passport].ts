import {
  githubStrategy,
  googleStrategy,
  localStrategy,
} from '@lib/config/passport-strategy'
import { NextApiRequest, NextApiResponse } from 'next'
import passport from 'passport'
import { setCookie } from 'cookies-next'

// register the passport method
// to use in the route
passport.use(localStrategy)
passport.use(githubStrategy)
passport.use(googleStrategy)

/**
 * # handler
 *
 * the api handler for passport and
 * authentication using local, google, and github
 *
 * @param req reuqest
 * @param res response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const passportQuery = req.query.passport

  if (passportQuery) {
    // authenticate using local
    if (passportQuery.includes('local')) {
      passport.authenticate('local', (err, user) => {
        if (err) {
          return res.status(err.statusCode).json(err)
        } else {
          setCookie('user', user.user, { req, res })
          setCookie('accessToken', user.accessToken, { req, res })

          res.status(200).json({})
        }
      })(req, res)
    }

    // authenticate using google
    if (passportQuery.includes('google')) {
      if (passportQuery.includes('callback')) {
        passport.authenticate('google', async (err, user) => {
          if (err) {
            res.redirect('/signin?status=fail&strategy=google')
          } else {
            setCookie('user', user.user, { req, res })
            setCookie('accessToken', user.accessToken, { req, res })

            res.redirect('/signin')
          }
        })(req, res)
      } else {
        passport.authenticate('google', { scope: ['email', 'profile'] })(
          req,
          res
        )
      }
    }

    if (passportQuery.includes('github')) {
      if (passportQuery.includes('callback')) {
        passport.authenticate('github', async (err, user) => {
          if (err) {
            res.redirect('/signin?status=fail&strategy=github')
          } else {
            setCookie('user', user.user, { req, res })
            setCookie('accessToken', user.accessToken, { req, res })
            res.redirect('/signin')
          }
        })(req, res)
      } else {
        passport.authenticate('github', { scope: ['user:email'] })(req, res)
      }
    }
  } else {
    return res.redirect(`${process.env.AUTH_CALLBACK_DOMAIN}/signin`)
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
