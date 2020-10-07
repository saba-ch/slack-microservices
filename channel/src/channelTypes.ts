import { IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class CreateChannelInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  description: string
}

@InputType()
export class UpdateChannelInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  description: string

  @Field()
  @IsString()
  channelId: string
}

@InputType()
export class InviteUserInput {
  @Field()
  @IsString()
  email: string

  @Field()
  @IsString()
  channelId: string
}

@InputType()
export class LeaveChannelInput {
  @Field()
  @IsString()
  channelId: string
}

@InputType()
export class DeleteChannelInput {
  @Field()
  @IsString()
  channelId: string
}

@ObjectType()
export class ISuccess {
  @Field(() => Boolean)
  success: boolean
}

@ObjectType()
export class IChannelMember {
  @Field(() => String)
  name: string

  @Field(() => String)
  role: string

  @Field(() => String)
  member: string
}

@ObjectType()
export class IChannel {
  @Field(() => String)
  organization: string

  @Field(() => String)
  description: string

  @Field(() => [IChannelMember])
  members: IChannelMember[]

  @Field(() => String)
  name: string

  @Field(() => String)
  creator: string
}