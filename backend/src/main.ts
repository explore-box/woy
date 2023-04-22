import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'

const PORT = parseInt(process.env.PORT, 10) || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // complete app settings
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.use(compression())
  app.use(helmet())
  app.enableCors({ origin: '*' })

  await app.listen(PORT, () => {
    console.log(`🎉 Application running at http://localhost:${PORT}`)
  })
}

bootstrap()
