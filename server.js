require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

const server = new ApolloServer({
    schema,
    context: {
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQzMTEyODM0fQ.UGJ6K7XY9JNyr2k-JeQAw7ZT4Rt_c9RCVOJhmf4IRaA',
    },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log('🥤 Server is running on http://localhost:4000'));
