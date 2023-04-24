import apiConnection from '@lib/connections/api-connection'
import { AuthData } from '~/types/account'

class AccounService {
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
