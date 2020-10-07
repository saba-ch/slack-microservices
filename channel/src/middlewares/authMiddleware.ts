import { Request } from 'express'
import { AuthChecker, UnauthorizedError } from 'type-graphql'

import jwtService, { JWTPayload } from '../services/jwtService'

const customAuthChecker: AuthChecker<{ req: Request, user?: JWTPayload }> = async ({ context }) => {
  let { authorization } = context.req.headers
  if (!authorization) throw new Error('Authorization header not provided')

  if (authorization.includes('Bearer')) authorization = authorization.slice(7)

  try {
    const jwtPayload = jwtService.verify(authorization)
    context.user = jwtPayload
    return true
  } catch (err) {
    throw new UnauthorizedError()
  }
}

export default customAuthChecker