import { GraphQLServer } from "graphql-yoga";

// Scalar types: String, Boolean, Int, Float, ID
const type = `
  type Query {
    hello: String!
    location: String!
    me: User!
    post: Post!
    add(a: Float!, b: Float!): Float!
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
      return args.a + args.b
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