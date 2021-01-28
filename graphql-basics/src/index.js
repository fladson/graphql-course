import { GraphQLServer } from "graphql-yoga";

const users = [{
  id: "1",
  name: "name",
  email: "email@email.com",
  age: 33
}, {
  id: "2",
  name: "user",
  email: "user@email.com",
}]

const posts = [{
  id: "1",
  title: "Title",
  body: "Body",
  published: false
}, {
  id: "2",
  title: "Title 1",
  body: "Body 1",
  published: true
}]
// Scalar types: String, Boolean, Int, Float, ID
const type = `
  type Query {
    hello: String!
    location: String!
    me: User!
    post: Post!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
  Query: {
    hello() {
      return "Hello!"
    },
    location() {
      return "Berlin"
    },
    me(){
      return {
        id: "012943",
        name: "Name",
        email: "email@email.com"
      }
    },
    post(){
      return {
        id: "1",
        title: "Post Title",
        body: "Body",
        published: true
      }
    },
    add(parent, args, context, info){
      if (args.numbers.length === 0) {
        return 0
      }

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    },
    grades(parent, args, context, info){
      return [99, 80, 90]
    },
    users(parent, args, context, info){
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, context, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

        return isTitleMatch || isBodyMatch
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: type,
  resolvers: resolvers
})

server.start(() => {
  console.log("Server is up!");
})