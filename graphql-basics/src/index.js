import { GraphQLServer } from "graphql-yoga";

const type = `
  type Query {
    hello: String!
    location: String!
  }
`

const resolvers = {
  Query: {
    hello() {
      return "Hello!"
    },
    location() {
      return "Berlin"
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