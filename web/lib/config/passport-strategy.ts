import accountService from '@lib/services/account-service'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

/**
 * # localStrategy
 *
 * the strategy to login
 * using the local username, and password method
 */
const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const res = await accountService.emailAuth({ email: username, password })
      done(null, res)
    } catch (error) {
      done(error)
    }
  }
)

/**
 * # githubStrategy
 *
 * use to login using the github
 * OAuth2 method in the app
 */
const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: `${process.env.AUTH_CALLBACK_DOMAIN}/api/auth/github/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const res = await accountService.authGithub(profile._json)
      return done(null, res)
    } catch (error) {
      return done(error, null)
    }
  }
)

/**
 * # googleStrategy
 *
 * use to login using the
 * Google OAuth2 methods
 */
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.AUTH_CALLBACK_DOMAIN}/api/auth/google/callback`,
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const res = await accountService.authGoogle(profile)
      done(null, res)
    } catch (error) {
      done(error, null)
    }
  }
)

export { localStrategy, githubStrategy, googleStrategy }
