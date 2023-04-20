import { Provider } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'

export const TIGRIS_PROVIDER = 'Tigris'

export const TigrisProvider: Provider = {
  provide: TIGRIS_PROVIDER,
  useFactory: () => {
    const client = new Tigris()
    return client
  },
}
