import { ApiProperty } from '@nestjs/swagger'
import { UserPayload } from 'src/user/model/user.payload'

export class AuthPayload {
  @ApiProperty()
  user: UserPayload

  @ApiProperty()
  accessToken: string
}
