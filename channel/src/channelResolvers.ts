import { JWTPayload } from 'services/jwtService'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'

import channelService from './channelService'

import CurrentUser from './decorators/currentUser'

import {
  UpdateChannelInput,
  CreateChannelInput,
  InviteUserInput,
  ISuccess,
  LeaveChannelInput,
  DeleteChannelInput,
  IChannel
} from './channelTypes'

@Resolver()
class ChannelResolver {
  @Authorized()
  @Query(() => IChannel)
  async channel(
    @Arg('id') channelId: string,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<IChannel> {
    return await channelService.getChannel(channelId, currentUser)
  }

  @Authorized()
  @Mutation(() => IChannel)
  async createChannel(
    @Arg('data') createChannelInput: CreateChannelInput,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<IChannel> {
    return await channelService.createChannel(createChannelInput, currentUser)
  }

  @Authorized()
  @Mutation(() => IChannel)
  async updateChannel(
    @Arg('data') updateChannelInput: UpdateChannelInput,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<IChannel> {
    return await channelService.updateChannel(updateChannelInput, currentUser)
  }

  @Authorized()
  @Mutation(() => IChannel)
  async inviteUserToChannel(
    @Arg('data') inviteUserInput: InviteUserInput,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<IChannel> {
    return await channelService.inviteUserToChannel(inviteUserInput, currentUser)
  }

  @Authorized()
  @Mutation(() => ISuccess)
  async leaveChannel(
    @Arg('data') leaveChannelInput: LeaveChannelInput,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<ISuccess> {
    return await channelService.leaveChannel(leaveChannelInput, currentUser)
  }

  @Authorized()
  @Mutation(() => ISuccess)
  async deleteChannel(
    @Arg('data') deleteChannelInput: DeleteChannelInput,
    @CurrentUser() currentUser: JWTPayload
  ): Promise<ISuccess> {
    return await channelService.deleteChannel(deleteChannelInput, currentUser)
  }
}

export default ChannelResolver