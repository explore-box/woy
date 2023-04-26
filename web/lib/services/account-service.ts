import apiConnection from '@lib/connections/api-connection'
import { AuthData } from '~/types/account'

class AccounService {
  async sendResetPasswordCode(data: any): Promise<void> {}

  async verifyResetPasswordCode(data: any): Promise<void> {
    const newPassword = data.newPassword
    const confirmPassword = data.confirmNewPassword

    if (newPassword == confirmPassword) {
      return
    } else {
      throw {
        message: 'auth/password-not-match',
      }
    }
  }

  async resetPassword(data: any): Promise<void> {}

  async emailAuth(params: {
    email: string
    password: string
  }): Promise<AuthData> {
    try {
      const res = await apiConnection.post<AuthData>('/v1/auth/email', {
        ...params,
      })

      return res.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  async authGithub(profile: Record<string, any>): Promise<AuthData> {
    try {
      const res = await apiConnection.post<AuthData>('/v1/auth/github', {
        ...profile,
      })

      return res.data
    } catch (error: any) {
      throw error.response.data
    }
  }

  async authGoogle(profile: Record<string, any>): Promise<AuthData> {
    try {
      const res = await apiConnection.post<AuthData>('/v1/auth/google', {
        ...profile,
      })

      return res.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}

const accountService = new AccounService()
export default accountService
