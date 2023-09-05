import { query } from './index.js'

export const getBook = async (bookId: string): Promise<any[]> => {
  const res = await query('SELECT * FROM recommendations WHERE id = $1', [bookId])
  return res.rows[0]
}

export const getBookIDs = async (params = []): Promise<any[]> => {
  const res = await query('SELECT id FROM recommendations', params)
  return res.rows
}

export const getAllBooks = async (): Promise<any[]> => {
  const res = await query('SELECT * FROM recommendations ORDER BY date_added DESC')
  return res.rows
}

export const saveBook = async ({ bookName, authorName, note }: { bookName: string, authorName: string, note: string }): Promise<any[]> => {
  const res = await query('INSERT INTO recommendations (book_name, author_name, note) VALUES ($1, $2, $3) RETURNING id', [bookName, authorName, note])
  return res.rows[0]
}

export const getComments = async (bookId: string): Promise<any[]> => {
  const res = await query('SELECT * FROM comments WHERE book_id = $1 AND deleted != 1 ORDER BY date_added ASC', [bookId])
  return res.rows
}

export const saveComment = async ({ comment, username, bookId }: { comment: string, username: string, bookId: string }): Promise<any[]> => {
  const res = await query('INSERT INTO comments (comment, user_name, book_id) VALUES ($1, $2, $3) RETURNING *', [comment, username, bookId])
  return res.rows[0]
}
