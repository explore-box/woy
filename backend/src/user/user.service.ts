import { Inject, Injectable } from '@nestjs/common'
import { EmailPassUserInput } from './model/user.input'
import { AuthPayload } from './model/user.payload'
import { TIGRIS_PROVIDER } from 'src/tigris/tigris.constants'
import { Tigris } from '@tigrisdata/core'
import { User } from './model/user.schema'
import * as bcrypt from 'bcryptjs'

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

  async authEmailPass(body: EmailPassUserInput): Promise<AuthPayload> {
    // first check the user with the same email
    const sameUser = await this.tigris
      .getDatabase()
      .getCollection<User>(User)
      .findOne({ filter: { email: body.email } })

    if (sameUser) {
      // create a new one
      const username = await this.generateUsernameFromEmail(body.email)
      const hashedPassword = await this.hashingPassword(body.password)
      const user = await this.tigris
        .getDatabase()
        .getCollection(User)
        .insertOne({
          email: body.email,
          providers: ['email'],
          username,
          password: hashedPassword,
          role: 'user',
        })
    }

    return {} as any
  }
}
