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
  id: string

  @SearchField({})
  @Field()
  fullName: string

  @SearchField()
  @Field()
  username: string

  @SearchField()
  @Field()
  email: string

  @Field()
  password: string

  @Field({ elements: TigrisDataTypes.STRING })
  prividers: Array<string>

  @Field({ default: 'user' })
  role: string

  @Field()
  avatar: string

  @Field()
  cover: string

  @Field({ timestamp: 'createdAt' })
  createdAt: string

  @Field({ timestamp: 'updatedAt' })
  updatedAt: string
}
