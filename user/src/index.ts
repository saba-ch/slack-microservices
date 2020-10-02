import { buildSchema } from 'type-graphql'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import 'reflect-metadata'

import app from './app'
import { authMiddleware, errorMiddleware } from './middlewares'

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not provided')
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not provided')

  const schema = await buildSchema({
    resolvers: [__dirname + '/*Resolvers.ts'],
    authChecker: authMiddleware,
    globalMiddlewares: [errorMiddleware]
  })

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => ({ req })
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
