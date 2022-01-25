# Instaclone

Instaclone Backend.

## User

-   [ ] Create Account
-   [ ] See Profile
-   [ ] Login
-   [ ] Edit Profile
-   [ ] Follow User
-   [ ] Unfollow user
-   [ ] Change Avatar (Image Upload)

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
