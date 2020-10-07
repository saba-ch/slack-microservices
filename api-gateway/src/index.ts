import { ApolloServer } from 'apollo-server-express'
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'

import app from './app'

if (!process.env.ORGANIZATION_URI) throw new Error('ORGANIZATION_URI is required')
if (!process.env.USER_URI) throw new Error('USER_URI is required')
if (!process.env.CHANNEL_URI) throw new Error('CHANNEL_URI is required')

const start = async () => {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'user', url: process.env.USER_URI },
      { name: 'organization', url: process.env.ORGANIZATION_URI },
      { name: 'channel', url: process.env.CHANNEL_URI },
    ],
    buildService({ url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          const { headers }: any = context
          if (headers) {
            for (const key in headers) {
              if (request.http && key === 'authorization') {
                request.http.headers.set(key, headers[key])
              }
            }
          }
        }
      })
    }
  })

  const server = new ApolloServer({
    gateway,
    context: ({ req: { headers } }) => ({ headers }),
    subscriptions: false
  })

  server.applyMiddleware({ app })

  app.listen(3000, () => console.info('Listening on port: 3000'))
}

start()