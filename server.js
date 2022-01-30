require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

const PORT = process.env.PORT;
const startServer = async () => {
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

    await server.start();
    const app = express();
    app.use(logger('tiny')); // logger 사용 선언 다음에 적어줘야 로깅이 된다.
    app.use('/static', express.static('uploads'));
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    await new Promise((func) => app.listen({ port: PORT }, func));
    console.log(`🥤 Server is running on http://localhost:4000${server.graphqlPath}`);
};

startServer();
