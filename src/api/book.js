import * as express from 'express'
import { getBook, getBookIDs } from '../db/dbUtils.js'

const router = express.Router()

router.get('/bookIDs', async (req, res, next) => {
  try {
    const resp = await getBookIDs()
    res.status(200).send(resp)
  } catch (err) {
    next(err)
  }
})

router.get('/:bookId', async (req, res, next) => {
  const { bookId } = req.params
  if (!bookId) {
    throw new Error('Invalid param')
  }
  try {
    const book = await getBook(bookId)
    res.status(200).send(book)
  } catch (err) {
    next(err)
  }
})

export default router
