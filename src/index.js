import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { resolvers } from './resolvers.js'
import { typeDefs } from './schema.js'
import rateLimit from 'express-rate-limit'
import api from './api/index.js'

async function startApolloServer (typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
    formatError: (error) => {
      console.error(error)
      return error
    }
  })

  await server.start()

  server.applyMiddleware({ app })

  app.use(cors())
  app.use(express.json())

  const errorHandler = (error, _, response, __) => {
    // Error handling middleware functionality
    console.debug(`error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message)
  }
  app.use(errorHandler)

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20
  })
  // Apply rate limiter to all requests
  app.use(limiter)
  api(app)

  await new Promise((resolve) => httpServer.listen(process.env.PORT || 4000, resolve))
}

startApolloServer(typeDefs, resolvers)
