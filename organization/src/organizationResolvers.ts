import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'

import CurrentUser from './decorators/currentUser'
import { JWTPayload } from './services/jwtService'

import organizationService from './organizationService'

import {
  IOrganization,
  CreateOrganizationInput, InviteUserToOrganizationInput
} from './organizationTypes'

@Resolver()
class OrganizationResolver {

  @Authorized()
  @Query(() => IOrganization)
  async organization(@CurrentUser() user: JWTPayload): Promise<IOrganization> {
    return await organizationService.organization(user.organization)
  }

  @Authorized()
  @Mutation(() => IOrganization)
  async createOrganization(
    @Arg('data') createOrganizationInput: CreateOrganizationInput,
    @CurrentUser() user: JWTPayload
  ): Promise<IOrganization> {
    return await organizationService.createOrganization(createOrganizationInput, user)
  }

  @Authorized('ADMIN')
  @Mutation(() => IOrganization)
  async inviteUserToOrganization(
    @Arg('data') inviteUserToOrganizationInput: InviteUserToOrganizationInput,
    @CurrentUser() user: JWTPayload
  ): Promise<IOrganization> {
    return await organizationService.inviteUserToOrganization(inviteUserToOrganizationInput, user)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveOrganization(@CurrentUser() user: JWTPayload): Promise<boolean> {
    return await organizationService.leaveOrganization(user)
  }
}

export default OrganizationResolver