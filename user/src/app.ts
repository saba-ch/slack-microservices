import express from 'express'
import fs from 'fs'
import path from 'path'
import { json } from 'body-parser'
import { ApolloServer, gql } from 'apollo-server-express'

const userTypeDefs = gql`${fs.readFileSync(path.join(__dirname, './user.graphql')).toString()}`

import userResolvers from './userResolvers'

const app = express()

app.set('trust proxy', true)
app.use(json())

const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  playground: true,
  context: ({ req }) => ({ req })
})


server.applyMiddleware({ app, path: '/api/users' })

export default app