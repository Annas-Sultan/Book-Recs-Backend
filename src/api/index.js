import book from './book.js'
import recommendation from './recommendation.js'

export default function api (server) {
  server.use('/api/v1/book', book)
  server.use('/api/v1/recommend', recommendation)
}
