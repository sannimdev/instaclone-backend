require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
// here for Subscriptions
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const PORT = process.env.PORT;
const startServer = async () => {
    const app = express();
    app.use(logger('tiny')); // logger 사용 선언 다음에 적어줘야 로깅이 된다.
    app.use('/static', express.static('uploads'));
    app.use(graphqlUploadExpress());
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect: async ({ token }, _, context) => {
                if (!token) {
                    throw new Error("You can't listen");
                }
                const loggedInUser = await getUser(token);
                return { loggedInUser };
            },
        },
        {
            server: httpServer,
            path: '/graphql',
        }
    );
    const server = new ApolloServer({
        // schema를 직접 입력하는 것 대신에 typeDefs, resolvers 항목을 넘기면 File Upload 가능
        // production 모드에서도 플레이그라운드 사용
        // introspection: true,
        // playground: true,
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
        // 로그가 안찍히는데 ㅠㅠ
        context: async (ctx) => {
            if (ctx.req) {
                return {
                    loggedInUser: await getUser(ctx.req.headers.token),
                };
            } else {
                const {
                    connect: { context },
                } = ctx;
                return { loggedInUser: context.loggedInUser };
            }
        },
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((func) => httpServer.listen(PORT, func));
    console.log(`🥤 Server is running on http://localhost:4000${server.graphqlPath}`);
};

startServer();
