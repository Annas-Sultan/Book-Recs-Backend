import * as express from 'express'
import { saveBook } from '../db/dbUtils'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const data = req.body
  if (!data) throw new Error('Invalid form data')
  try {
    const response = await saveBook(data)
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

export default router
