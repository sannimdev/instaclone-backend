import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const client = new PrismaClient();

const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie!
        deleteMovie(title: String!): Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: () => ({ title: 'hello', year: 2022 }),
    },
    Mutation: {
        // root, args, context, inf
        createMovie: (root, { title, year, genre }, context, info) =>
            client.movie.create({
                data: {
                    title,
                    year,
                    genre,
                },
            }),
        deleteMovie: (root, { title }, context, info) => {
            console.log(title);
            return true;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(() => console.log('Server is running on http://localhost:4000'));
