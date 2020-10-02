import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  ApolloLink,
  HttpLink
} from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { onError } from '@apollo/link-error'

import config from 'config'
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

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${authHelper.getToken()}`
  }
}))

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )

  if (networkError) console.error(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({ uri: config.apiUrl })

const link = ApolloLink.from([authLink, errorLink, httpLink])

const inMemoryCache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache: inMemoryCache,
  defaultOptions
})