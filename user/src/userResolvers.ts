import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'

import CurrentUser from './decorators/currentUser'
import userService from './userService'
import { UserDoc } from './models/userModel'
import {
  SignInInput,
  AccessToken,
  SignUpInput,
  IUser
} from './userTypes'

@Resolver()
export class UserResolver {
  @Mutation(() => AccessToken)
  async signIn(@Arg('data') signInInput: SignInInput): Promise<AccessToken> {
    return await userService.signIn(signInInput)
  }

  @Mutation(() => AccessToken)
  async signUp(@Arg('data') signUpInput: SignUpInput): Promise<AccessToken> {
    return await userService.signUp(signUpInput)
  }

  @Authorized()
  @Query(() => IUser)
  user(@CurrentUser() user: UserDoc): IUser {
    return user
  }
}