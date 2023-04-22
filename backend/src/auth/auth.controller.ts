import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { AuthPayload } from './model/auth.payload'
import { EmailPassAuthInput } from './model/auth.input'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email')
  @ApiCreatedResponse({
    description: 'User success authenticated',
    type: AuthPayload,
  })
  authUserWithEmailPass(
    @Body() body: EmailPassAuthInput,
  ): Promise<AuthPayload> {
    return this.authService.authEmailPassword(body)
  }
}
