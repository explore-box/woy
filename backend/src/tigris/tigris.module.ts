import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TigrisService } from './tigris.service'
import { Tigris } from '@tigrisdata/core'
import { TIGRIS_PROVIDER } from './tigris.constants'
import { TigrisRootOptions } from './tigris.interface'

@Global()
@Module({
  imports: [],
  providers: [TigrisService],
  exports: [TigrisService],
})
export class TigrisModule {
  static forRoot({ schemas }: TigrisRootOptions): DynamicModule {
    // create the custom provider
    // for the tigris client
    const TigrisProvider: Provider = {
      provide: TIGRIS_PROVIDER,
      useFactory: async () => {
        const client = new Tigris()

        try {
          console.log(`🍀 Connecting to your database`)
          await client.getDatabase().initializeBranch()
          await client.registerSchemas(schemas)
          console.log(`🎉 Database connected ...`)
        } catch (error) {
          console.log(
            `🧐 Something wrong when connecting to database, caused by ${error}`,
          )
        }

        return client
      },
    }

    return {
      module: TigrisModule,
      providers: [TigrisProvider],
      exports: [TigrisProvider],
    }
  }
}
