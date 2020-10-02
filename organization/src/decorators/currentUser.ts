import { Request } from 'express'
import { JWTPayload } from 'services/jwtService'
import { createParamDecorator } from 'type-graphql'


function CurrentUser() {
  return createParamDecorator<{ req: Request, user?: JWTPayload }>(({ context }): JWTPayload | undefined => context.user)
}

export default CurrentUser