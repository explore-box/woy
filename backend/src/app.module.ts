import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TigrisModule } from './tigris/tigris.module'
import { UserModule } from './user/user.module'
import { User } from './user/model/user.schema'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ThrottlerModule.forRoot({ limit: 10, ttl: 60 }),
    TigrisModule.forRoot({
      schemas: [User],
    }),

    // feature module
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
