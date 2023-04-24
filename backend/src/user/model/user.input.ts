import { ApiProperty } from '@nestjs/swagger'

export class EmailPassUserInput {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
