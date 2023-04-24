import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../decorator/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get the public decorator
    // using reflector
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // authenticate the resource
    // if not in public
    if (!isPublic) {
      const request = context.switchToHttp().getRequest()
      const token = this.extractBarearFromHeader(request)

      if (!token) {
        throw new ForbiddenException('auth/signin-need', {
          cause: new Error(),
          description: `Please signin before using the resources`,
        })
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })

        request['user'] = payload
      } catch (error) {
        throw new UnauthorizedException('auth/unauthorized', {
          cause: new Error(),
          description: `Opps, you don't have the right access for this resources`,
        })
      }

      return true
    } else {
      return true
    }
  }

  extractBarearFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Barear' ? token : undefined
  }
}
