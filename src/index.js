import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import api from './api/index.js'
import { resolvers } from './resolvers.js'
import { typeDefs } from './schema.js'

import cors from 'cors'
import pkg from 'body-parser'
const { json } = pkg

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

// applying cors to graphql
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token })
  })
)
// applying cors for other endpoints
app.use(cors())
app.use(json())

const errorHandler = (error, _, response, __) => {
  // Error handling middleware functionality
  console.debug(`error ${error.message}`) // log the error
  const status = error.status || 400
  // send back an easily understandable error message to the caller
  response.status(status).send(error.message)
}
app.use(errorHandler)

api(app)

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
