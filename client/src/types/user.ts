export interface IUser {
  email: string
  organization: string
  name: string
}

export interface IUserContext {
  user: IUser | undefined
}