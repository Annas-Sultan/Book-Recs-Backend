import { query } from './index'

export const getBook = async (bookId: string) => {
  const res = await query('SELECT * FROM recommendations WHERE id = $1', [bookId])
  return res.rows[0]
};

export const getBookIDs = async (params = []) => {
  const res = await query('SELECT id FROM recommendations', params)
  return res.rows
};

export const getAllBooks = async () => {
  const res = await query('SELECT * FROM recommendations ORDER BY date_added DESC')
  return res.rows
}

export const saveBook = async ({ bookName, authorName, note }: { bookName: string, authorName: string, note: string }) => {
  const res = await query('INSERT INTO recommendations (book_name, author_name, note) VALUES ($1, $2, $3) RETURNING id', [bookName, authorName, note])
  return res.rows[0]
}