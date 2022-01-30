# Instaclone

Instaclone Backend.

## User

-   [x] Create Account
-   [x] See Profile
-   [x] Login
-   [x] Edit Profile
-   [x] Change Avatar (Image Upload)
-   [ ] Follow User
-   [ ] Unfollow user
-   [ ] Search Users
-   [ ] See Followers
-   [ ] See Following

## ETC

### 3.8. Prisma Studio 설치하기

```
npx prisma studio
```

### 3.10. Schema merging

```
npm install @graphql-tools/schema @graphql-tools/load-files @graphql-tools/merge
```

[Schema merging](https://www.graphql-tools.com/docs/schema-merging)

```js
// ./graphql/typeDefs.js
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const typesArray = loadFilesSync(path.join(__dirname, './types'));

module.exports = mergeTypeDefs(typesArray);
```

-   `**/*` 이러한 것들을 pattern language라 한다.

## 4.4. Login

-   Json web token의 표준을 구현한 [라이브러리](https://www.npmjs.com/package/jsonwebtoken)
    ```
    npm install jsonwebtoken
    ```

## 4.15. File Upload Part two

(댓글 퍼옴)

[Error: Unknown type "Upload". Did you mean "Float"?]

Apollo Server 3버전 이상으로 진행 중이신 분들 중 위와 같은 에러 발생시 아폴로 서버를 아폴로 익스프레스 서버로 바꾸고 아래와 같이 몇 가지 설정을 해주셔야 합니다.
강의 #4.18에서 아폴로 서버를 아폴로 익스프레스 서버로 바꾸기 때문에 여기서 미리 바꾸고 진행하셔도 됩니다.

npm i apollo-server-express express graphql-upload

server.js

```js
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';

const PORT = process.env.PORT;

const startServer = async () => {
    const server = new ApolloServer({
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
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    await new Promise((func) => app.listen({ port: PORT }, func));
    console.log(`🚀 Server: http://localhost:${PORT}${server.graphqlPath}`);
};
startServer();
```

editProfile.typeDefs.js에 scalar Upload 추가

```
export default gql`
scalar Upload
`
```

editProfile.resolvers.js 파일에 Upload: GraphQLUpload 추가

```
import { GraphQLUpload } from "graphql-upload";

export default {
Upload: GraphQLUpload,
};
```

🚀 http://localhost:4000/graphql
https://www.apollographql.com/docs/apollo-server/data/file-uploads/
