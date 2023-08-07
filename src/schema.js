import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  scalar Date

  type Book {
    id: ID
    book_name: String
    author_name: String
    note: String
    date_added: Date
  }
  type Query {
    Books: [Book]
    Book(id: ID!): Book
  }
`
