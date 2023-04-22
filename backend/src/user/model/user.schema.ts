import { ApiProperty } from '@nestjs/swagger'
import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisDataTypes,
} from '@tigrisdata/core'

@TigrisCollection('users')
export class User {
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1, autoGenerate: true })
  id?: string

  @ApiProperty()
  @SearchField({})
  @Field()
  fullName?: string

  @ApiProperty()
  @SearchField()
  @Field()
  username: string

  @ApiProperty()
  @SearchField()
  @Field()
  email: string

  @Field()
  password: string

  @ApiProperty()
  @Field({ elements: TigrisDataTypes.STRING })
  providers: Array<string>

  @ApiProperty()
  @Field({ default: 'user' })
  role: string

  @ApiProperty()
  @Field()
  avatar?: string

  @ApiProperty()
  @Field()
  cover?: string

  @ApiProperty()
  @Field({ timestamp: 'createdAt' })
  createdAt?: string

  @ApiProperty()
  @Field({ timestamp: 'updatedAt' })
  updatedAt?: string
}
