import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TigrisModule } from './tigris/tigris.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ThrottlerModule.forRoot({ limit: 10, ttl: 60 }),
    TigrisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
