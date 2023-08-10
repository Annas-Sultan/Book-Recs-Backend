import * as express from 'express'
import { saveBook } from '../db/dbUtils.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    console.log(data)
    if (!data) throw new Error('Invalid form data')
    const response = await saveBook(data)
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

export default router
