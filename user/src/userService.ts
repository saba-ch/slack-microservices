import userModel from './models/userModel'
import jwtService from './services/jwtService'
import passwordService from './services/passwordService'
import { AccessToken, SignInInput, SignUpInput } from './userTypes'

const signIn = async ({ email, password, organization }: SignInInput): Promise<AccessToken> => {
  const user = await userModel.findByEmailAndOrg(email, organization)
  if (!user) throw new Error('User doesn\'t exist')

  const isValidPassword = passwordService.compare(password, user.password)
  if (!isValidPassword) throw new Error('invalid password')

  const accessToken = jwtService.sign(user.id, user.organization)

  return { accessToken }
}

const signUp = async ({ email, password, organization, name }: SignUpInput): Promise<AccessToken> => {
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

export default {
  signIn,
  signUp,
}