import { ApolloServer, gql } from 'apollo-server-lambda';

// GraphQL Schema Definition
const typeDefs = gql`
  type PasswordData {
    password: String!
  }

  type PasswordResponse {
    statusCode: Int!
    message: String!
    data: PasswordData!
  }

  type Query {
    getPassword: PasswordResponse!
  }
`;

// Resolver
const resolvers = {
  Query: {
    getPassword: () => {
      const basePassword = 'Bea';
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];
      const dynamicPassword = `${basePassword}-${formattedDate}`;
      
      return {
        statusCode: 200,
        message: 'Password retrieved successfully',
        data: {
          password: dynamicPassword,
        },
      };
    },
  },
};

// Apollo Server Lambda Setup
const server = new ApolloServer({ typeDefs, resolvers });

export const handler = server.createHandler();