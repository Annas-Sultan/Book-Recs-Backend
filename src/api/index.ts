import * as express from 'express';
import book from './book'
import recommendation from './recommendation'

export default function api(server: express.Express) {
  server.use('/api/v1/book', book);
  server.use('/api/v1/recommend', recommendation);
  // server.use('/api/v1/team-leader', teamLeaderApi, handleError);
}