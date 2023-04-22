import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
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
        return sameUser
      } else {
        throw new ForbiddenException(
          new Error(`Opps, your password look weird`),
          'wrong-password',
        )
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
        role: 'user',
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
}
