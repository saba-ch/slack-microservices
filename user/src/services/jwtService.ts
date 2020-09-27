import jwt from 'jsonwebtoken'

export interface JWTPayload {
  id: string
  organization: string
}

const sign = (userId: string, organization: string): string => {
  return jwt.sign({
    id: userId,
    organization
  },
    process.env.JWT_KEY!,
    {
      expiresIn: '1 days'
    }
  )
}

const verify = (token: string): JWTPayload => {
  const payload = jwt.verify(token, process.env.JWT_KEY!)

  return (payload as JWTPayload)
}

export default {
  verify,
  sign
}