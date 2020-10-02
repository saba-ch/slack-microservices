import { loader } from 'graphql.macro'

export const signInMutation = loader('./signInMutation.graphql')
export const signUpMutation = loader('./signUpMutation.graphql')

export const userQuery = loader('./userQuery.graphql')
