import { IsEmail, IsString, Length } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class AccessToken {
  @Field(() => String)
  accessToken: string
}

@ObjectType()
export class IUser {
  @Field(() => String)
  organization: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  role: string
}


@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @Length(8, 50)
  password: string

  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  organization: string
}

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @Length(8, 50)
  password: string

  @Field()
  @IsString()
  organization: string
}