import { GraphQLServer } from "graphql-yoga";

// Scalar types: String, Boolean, Int, Float, ID
const type = `
  type Query {
    hello: String!
    location: String!
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
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