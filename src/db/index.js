import pkg from 'pg'
import { HOST, PORT, USER, PASSWORD, DB } from '../config/db.config.js'
const { Client } = pkg

const client = new Client({
  host: HOST,
  port: PORT,
  database: DB,
  user: USER,
  password: PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
})

await client.connect()

export const query = async (text, params) => {
  return await client.query(text, params)
}
