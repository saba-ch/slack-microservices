
import { Request } from 'express'

import userModel from './models/userModel'
import jwtService from './services/jwtService'
import passwordService from './services/passwordService'
import { IAccessToken, IUser } from './userTypes'

interface SignInDto {
  email: string,
  password: string,
  organization: string,
}

const signIn = async (
  _root: string | undefined,
  { email, password, organization }: SignInDto
): Promise<IAccessToken> => {
  const user = await userModel.findByEmailAndOrg(email, organization)
  if (!user) throw new Error('User doesn\'t exist')

  const isValidPassword = passwordService.compare(password, user.password)
  if (!isValidPassword) throw new Error('invalid password')

  const accessToken = jwtService.sign(user.id, user.organization)

  return { accessToken }
}

interface SignUpDto {
  email: string,
  password: string,
  organization: string,
  name: string
}

const signUp = async (
  _root: string | undefined,
  { email, password, organization, name }: SignUpDto
): Promise<IAccessToken> => {
  const existingUser = await userModel.findByEmailAndOrg(email, organization)
  if (existingUser) throw new Error('User already exists')

  const hashedPassword = passwordService.hash(password)

  const user = new userModel({
    email,
    password: hashedPassword,
    organization,
    name,
    role: 'ADMIN'
  })
  await user.save()

  const accessToken = jwtService.sign(user.id, user.organization)

  return { accessToken }
}

const currentUser = async (
  _root: any,
  _args: any,
  { req }: { req: Request }
): Promise<IUser> => {
  let { authorization } = req.headers
  if (!authorization) throw new Error('Authorization header not provided')

  if (authorization.includes('Bearer')) authorization = authorization.slice(7)

  const jwtPayload = jwtService.verify(authorization)

  const user = await userModel.findByIdAndOrg(jwtPayload.id, jwtPayload.organization)

  return user
}

export default {
  signIn,
  signUp,
  currentUser
}