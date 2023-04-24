export interface UserData {
  id?: string
  fullName?: string
  username?: string
  providers?: string[]
  email?: string
  role?: string
  avatar?: string
  cover?: string
}

export interface AuthData {
  user: UserData
  accessToken: string
}
