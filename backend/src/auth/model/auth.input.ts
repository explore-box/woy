import { ApiProperty } from '@nestjs/swagger'

export class EmailPassAuthInput {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
