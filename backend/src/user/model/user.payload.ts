import { OmitType } from '@nestjs/swagger'
import { User } from './user.schema'

export class UserPayload extends OmitType(User, ['password'] as const) {}
