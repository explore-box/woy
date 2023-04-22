import { authOptions } from '@lib/config/next-auth-config'
import NextAuth from 'next-auth/next'

export default NextAuth(authOptions)
