import { Client } from 'pg'

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
const Setup = async () => {
    try {
        await client.connect()
    } catch (err) {
        console.error(err)
    }
}
Setup()

export const query = (text: string, params?: any[]) => {
    return client.query(text, params)
}
