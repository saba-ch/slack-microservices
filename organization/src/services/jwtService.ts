import jwt from 'jsonwebtoken'

export interface JWTPayload {
  id: string
  organization: string
}

const verify = (token: string): JWTPayload => {
  const payload = jwt.verify(token, process.env.JWT_KEY!)

  return (payload as JWTPayload)
}

export default {
  verify,
}
