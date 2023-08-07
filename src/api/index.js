import book from './book'
import recommendation from './recommendation'

export default function api (server) {
  server.use('/api/v1/book', book)
  server.use('/api/v1/recommend', recommendation)
}
