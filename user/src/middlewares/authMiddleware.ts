import { Request } from 'express'
import { AuthChecker } from 'type-graphql'
import userModel, { UserDoc } from '../models/userModel'
import jwtService from '../services/jwtService'

const customAuthChecker: AuthChecker<{ req: Request, user?: UserDoc }> = async ({ context }) => {
  let { authorization } = context.req.headers
  if (!authorization) throw new Error('Authorization header not provided')

  if (authorization.includes('Bearer')) authorization = authorization.slice(7)

  const jwtPayload = jwtService.verify(authorization)

  const user = await userModel.findByIdAndOrg(jwtPayload.id, jwtPayload.organization)
  context.user = user

  return true
}

export default customAuthChecker