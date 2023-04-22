import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TigrisModule } from 'src/tigris/tigris.module'

@Module({
  imports: [TigrisModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
