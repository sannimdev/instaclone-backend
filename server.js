require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
    // schema를 직접 입력하는 것 대신에 typeDefs, resolvers 항목을 넘기면 File Upload 가능
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log('🥤 Server is running on http://localhost:4000'));
