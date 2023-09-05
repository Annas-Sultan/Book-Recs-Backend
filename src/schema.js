import gql from 'graphql-tag'

export const typeDefs = gql`
  scalar Date

  type Book {
    id: ID
    book_name: String
    author_name: String
    note: String
    date_added: Date
  }
  type Comment {
    id: ID
    comment: String
    user_name: String
    date_added: Date
    deleted: Int
  }
  input CommentInput {
    comment: String
    username: String
    bookId: ID
  }
  type Query {
    Books: [Book]
    Book(id: ID!): Book
    Comments(bookId: ID!): [Comment]
  }
  type Mutation {
    postComment(input: CommentInput!): Comment
  }
`
