import { useMutation, useQuery } from '@apollo/client'

import {
  signInMutation,
  signUpMutation,
  userQuery
} from 'gql/user'

export const useUser = () => {
  const { data, error, refetch, loading } = useQuery(userQuery)

  return {
    user: (data && data.user) || {},
    error,
    refetch,
    loading
  }
}

export const useSignUp = () => useMutation(signUpMutation)[0]
export const useSignIn = () => useMutation(signInMutation)[0]
