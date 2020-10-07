
import channelModel from './models/channelModel'
import userModel from './models/userModel'

import { JWTPayload } from './services/jwtService'
import {
  UpdateChannelInput,
  CreateChannelInput,
  InviteUserInput,
  ISuccess,
  LeaveChannelInput,
  DeleteChannelInput,
  IChannel
} from './channelTypes'

const getChannel = async (channelId: string, currentUser: JWTPayload): Promise<IChannel> => {
  const channel = await channelModel.findOne({ _id: channelId, organization: currentUser.organization })
  if (!channel) throw new Error('Channel doesn\'t exist')

  return channel
}

const createChannel = async (
  createChannelInput: CreateChannelInput,
  currentUser: JWTPayload
): Promise<IChannel> => {

  const existingChannel = await channelModel.findOne({
    name: createChannelInput.name,
    organization: currentUser.organization
  })
  if (existingChannel) throw new Error('Channel already exists')

  const user = await userModel.findById(currentUser.id)
  if (!user) throw new Error('User doesn\'t exists')

  const channel = new channelModel({
    name: createChannelInput.name,
    description: createChannelInput.description,
    organization: user.organization,
    creator: user.id,
    members: [{
      name: user.name,
      role: user.role,
      member: user.id
    }]
  })

  await channel.save()

  return channel
}

const updateChannel = async (
  updateChannelInput: UpdateChannelInput,
  currentUser: JWTPayload
): Promise<IChannel> => {
  const { channelId, name, description } = updateChannelInput
  const { id: userId } = currentUser

  const channel = await channelModel.findOneAndUpdate({ _id: channelId, creator: userId }, {
    $set: {
      name,
      description
    }
  }, { new: true })
  if (!channel) throw new Error('Channel doesn\'t exist')

  return channel
}

const inviteUserToChannel = async (inviteUserInput: InviteUserInput, currentUser: JWTPayload): Promise<IChannel> => {
  const { email, channelId } = inviteUserInput

  const channel = await channelModel.findOne({ _id: channelId, organization: currentUser.organization })
  if (!channel) throw new Error('Channel doesn\'t exist')

  const user = await userModel.findOne({ email, organization: channel.organization })
  if (!user) throw new Error('User doesn\'t exist')

  channel.set('members', [...channel.members, { name: user.name, role: user.role, member: user }])
  await channel.save()

  return channel
}

const leaveChannel = async (
  leaveChannelInput: LeaveChannelInput,
  currentUser: JWTPayload
): Promise<ISuccess> => {
  const { channelId } = leaveChannelInput

  const channel = await channelModel.findOne({ _id: channelId, organization: currentUser.organization })
  if (!channel) throw new Error('Channel doesn\'t exist')

  const members = channel.members.filter(({ member }) => member !== currentUser.id)
  if (!members.length) {
    await deleteChannel(
      { channelId },
      currentUser
    )
  } else {
    channel.set('members', members)
    await channel.save()
  }

  return { success: true }
}

const deleteChannel = async (
  deleteChannelInput: DeleteChannelInput,
  currentUser: JWTPayload
): Promise<ISuccess> => {
  const { channelId } = deleteChannelInput

  const channel = await channelModel.findOne({ _id: channelId, organization: currentUser.organization })
  if (!channel) throw new Error('Channel doesn\'t exist')

  channel.set('deletedAt', new Date())
  await channel.save()

  return { success: true }
}


export default {
  createChannel,
  updateChannel,
  inviteUserToChannel,
  leaveChannel,
  deleteChannel,
  getChannel
}