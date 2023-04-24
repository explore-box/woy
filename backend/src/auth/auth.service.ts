import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/model/user.schema'
import { UserService } from 'src/user/user.service'
import { EmailPassAuthInput } from './model/auth.input'
import { AuthPayload } from './model/auth.payload'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAuthToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      iat: Math.floor(new Date().getTime() / 1000),
    }
    const jwtToken = await this.jwtService.signAsync(payload)

    return jwtToken
  }

  async authEmailPassword(body: EmailPassAuthInput): Promise<AuthPayload> {
    const user = await this.userService.signEmailPass(body)
    const accessToken = await this.generateAuthToken(user)

    return {
      user,
      accessToken,
    }
  }

  async authWithGithubCredentials(body: any): Promise<AuthPayload> {
    const user = await this.userService.signUserWithGithubCredential(body)
    const accessToken = await this.generateAuthToken(user)

    return {
      user,
      accessToken,
    }
  }

  async authWithGoogleCredentials(body: any): Promise<AuthPayload> {
    const user = await this.userService.signUserWithGoogleCredential(body)
    const accessToken = await this.generateAuthToken(user)

    return {
      user,
      accessToken,
    }
  }
}
