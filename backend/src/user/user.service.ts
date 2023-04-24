import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { TIGRIS_PROVIDER } from 'src/tigris/tigris.constants'
import { Tigris } from '@tigrisdata/core'
import { User } from './model/user.schema'
import * as bcrypt from 'bcryptjs'
import { EmailPassUserInput } from './model/user.input'

@Injectable()
export class UserService {
  constructor(@Inject(TIGRIS_PROVIDER) private readonly tigris: Tigris) {}

  async generateUsernameFromEmail(email: string): Promise<string> {
    const username = email.split('@')[0].replace(/[.+]/g, '_')
    return username
  }

  async hashingPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
  }

  async matchPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async signEmailPass(body: EmailPassUserInput): Promise<User> {
    // first check the user with the same email
    const sameUser = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .findOne({ filter: { email: body.email } })

    // gonna check if the passwor is match
    if (sameUser) {
      const isPasswordMatch = await this.matchPassword(
        body.password,
        sameUser.password,
      )

      if (isPasswordMatch) {
        if (!sameUser.providers.includes('email')) {
          await this.tigris
            .getDatabase()
            .getCollection<User>(User)
            .updateOne({
              filter: { email: body.email },
              fields: {
                providers: [...sameUser.providers, 'email'],
              },
            })
        }

        return sameUser
      } else {
        throw new BadRequestException('auth/invalid-password', {
          cause: new Error(),
          description: `Opps, your password look weird`,
        })
      }
    }

    // create a new one
    const username = await this.generateUsernameFromEmail(body.email)
    const hashedPassword = await this.hashingPassword(body.password)
    const user = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .insertOne({
        email: body.email,
        providers: ['email'],
        username,
        password: hashedPassword,
      })

    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .findOne({ filter: { email } })
    return user
  }

  async signUserWithGithubCredential(
    credentials: Record<string, any>,
  ): Promise<any> {
    const sameUser = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .findOne({ filter: { username: credentials.login } })

    if (sameUser) {
      // add the provider if not found the specify one
      if (sameUser.providers && sameUser.providers.includes('github')) {
        return sameUser
      }

      const updatedUser = this.tigris
        .getDatabase()
        .getCollection<User>(User)
        .updateOne({
          filter: { username: credentials.login },
          fields: {
            avatar: sameUser.avatar ?? credentials.avatar_url,
            providers: [...sameUser.providers, 'github'],
            fullName: sameUser.fullName ?? credentials.name,
          },
        })

      return updatedUser
    } else {
      const createdUser = await this.tigris
        .getDatabase()
        .getCollection<User>(User)
        .insertOne({
          email: credentials.email,
          providers: ['github'],
          username: credentials.login,
          avatar: credentials.avatar_url,
          fullName: credentials.name,
        })

      return createdUser
    }
  }

  async signUserWithGoogleCredential(
    credentials: Record<string, any>,
  ): Promise<any> {
    const sameUser = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .findOne({ filter: { email: credentials.email } })
    if (sameUser) {
      // add the provider if not found the specify one
      if (sameUser.providers && sameUser.providers.includes('google')) {
        return sameUser
      }

      const updatedUser = this.tigris
        .getDatabase()
        .getCollection<User>(User)
        .updateOne({
          filter: { email: credentials.email },
          fields: {
            fullName: sameUser.fullName ?? credentials.displayName,
            avatar: sameUser.avatar ?? credentials.picture,
            cover: sameUser.cover ?? credentials.coverPhoto,
            providers: [...sameUser.providers.slice(), 'google'],
          },
        })

      return updatedUser
    } else {
      const username = await this.generateUsernameFromEmail(credentials.email)
      const createdUser = await this.tigris
        .getDatabase()
        .getCollection<User>(User)
        .insertOne({
          email: credentials.emails,
          providers: ['google'],
          username,
          avatar: credentials.picture,
          fullName: credentials.displayName,
          cover: credentials.coverPhoto,
        })

      return createdUser
    }
  }
}
