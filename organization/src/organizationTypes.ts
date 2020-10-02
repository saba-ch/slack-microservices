import { IsEmail, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class IOrganizationMember {
  @Field(() => String)
  name: string

  @Field(() => String)
  role: string

  @Field(() => String)
  member?: string
}

@ObjectType()
export class IOrganizationChannel {
  @Field(() => String)
  name: string

  @Field(() => String)
  channel: string
}

@ObjectType()
export class IOrganization {
  @Field(() => String)
  name: string

  @Field(() => String)
  logo: string

  @Field(() => [IOrganizationMember])
  members: IOrganizationMember[]

  @Field(() => [IOrganizationChannel])
  channels: IOrganizationChannel[]
}

@InputType()
export class CreateOrganizationInput {
  @Field()
  @IsString()
  name: string
}

@InputType()
export class InviteUserToOrganizationInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsEmail()
  email: string
}