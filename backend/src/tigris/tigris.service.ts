import { Injectable } from '@nestjs/common'
import { Tigris } from '@tigrisdata/core'

@Injectable()
export class TigrisService extends Tigris {}
