import { buildSchema, createResolversMap } from 'type-graphql'
import { printSchema, buildFederatedSchema } from '@apollo/federation'
import { ApolloServerPluginInlineTrace } from 'apollo-server-core'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import gql from 'graphql-tag'
import 'reflect-metadata'

import app from './app'
import { authMiddleware, errorMiddleware } from './middlewares'

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not provided')
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not provided')

  const schema = await buildSchema({
    resolvers: [__dirname + '/*Resolvers.{ts,js}'],
    authChecker: authMiddleware,
    globalMiddlewares: [errorMiddleware]
  })

  const fedSchema = buildFederatedSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any
  })

  const server = new ApolloServer({
    schema: fedSchema,
    playground: true,
    context: ({ req }) => ({ req }),
    plugins: [
      ApolloServerPluginInlineTrace({
        rewriteError: (err) => err
      }),
    ],
  })

  server.applyMiddleware({ app, path: '/api/users' })

  await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.info('Connected to mongo')

  app.listen(3000, () => console.info('Listening on port 3000'))
}

start()
