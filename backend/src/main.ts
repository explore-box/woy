import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const PORT = parseInt(process.env.PORT, 10) || 4000

/**
 * # createSwaggerDocument
 *
 * create the swagger api documentation
 * for the api backend
 * @param app NestJS Application
 */
async function createSwaggerDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Woy Backend API')
    .setDescription('The Backend api service for woy password manager')
    .setVersion('1.0')
    .addTag('password manager')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
}

/**
 * # bootstrap
 *
 * bootstrap all application plugins
 * code, and middleware
 */
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

  // create the api documentation
  // from swagger
  await createSwaggerDocument(app)

  await app.listen(PORT, () => {
    console.log(`🎉 Application running at http://localhost:${PORT}`)
  })
}

bootstrap()
