import { Request } from 'express'
import { createParamDecorator } from 'type-graphql'

import { UserDoc } from '../models/userModel'

function CurrentUser() {
  return createParamDecorator<{ req: Request, user?: UserDoc }>(({ context }) => context.user)
}

export default CurrentUser