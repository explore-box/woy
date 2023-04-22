import { Body, Controller, Post } from '@nestjs/common'
import { EmailPassUserInput } from './model/user.input'
import { AuthPayload } from './model/user.payload'
import { UserService } from './user.service'

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/auth/email')
  authUserWithEmailPass(
    @Body() body: EmailPassUserInput,
  ): Promise<AuthPayload> {
    return this.userService.authEmailPass(body)
  }
}
