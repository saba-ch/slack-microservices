import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

import { authHelper } from './helpers'

const defaultOptions: DefaultOptions = {
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  },
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all'
  },
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  }
}

const authLink: any = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${authHelper.getToken()}`
  }
}))

const httpLink = new HttpLink({ uri: 'http://slack.dev/api/users/graphql' })

const link = authLink.concat(httpLink)

const inMemoryCache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache: inMemoryCache,
  defaultOptions
})