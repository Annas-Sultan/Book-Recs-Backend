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
try {
  await client.connect()
} catch (err) {
  console.error('DD Connection error', err)
}

export const query = async (text, params) => {
  return await client.query(text, params)
}
