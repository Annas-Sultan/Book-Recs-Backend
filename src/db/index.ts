import { Client, type QueryResult } from 'pg'

import { HOST, PORT, USER, PASSWORD, DB } from '../config/db.config.js'
const client = new Client({
  host: HOST,
  port: Number(PORT),
  database: DB,
  user: USER,
  password: PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
})
const Setup = async (): Promise<void> => {
  try {
    await client.connect()
  } catch (err) {
    console.error(err)
  }
}
void Setup()

export const query = async (text: string, params?: any[]): Promise<QueryResult<any>> => {
  return await client.query(text, params)
}
