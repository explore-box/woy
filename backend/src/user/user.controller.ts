import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}
}
