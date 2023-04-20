import {
  Inject,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common'
import { TIGRIS_PROVIDER, TigrisProvider } from './tigris.provider'
import { TigrisService } from './tigris.service'
import { Tigris, TigrisCollectionType } from '@tigrisdata/core'
import path, { dirname } from 'path'

@Module({
  providers: [TigrisProvider, TigrisService],
  exports: [TigrisProvider, TigrisService],
})
export class TigrisModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(@Inject(TIGRIS_PROVIDER) private client: Tigris) {}

  private getAllSchema = (): TigrisCollectionType[] => {
    return []
  }

  async onApplicationBootstrap() {
    try {
      // start to initialize database
      // and register the schema
      console.log(`🍀 Start connecting the database ...`)

      await this.client.getDatabase().initializeBranch()
      const schemas = this.getAllSchema()
      await this.client.registerSchemas(schemas)

      console.log(`🚀 Database connected.`)
    } catch (error: any) {
      console.log(`🧐 Failed to connect database cause ${error}`)
    }
  }
  onApplicationShutdown() {}
}
