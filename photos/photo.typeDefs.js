import { gql } from 'apollo-server';

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        likes: Int!
    }

    type Hashtag {
        id: Int!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }

    # Like는 user가 직접 확인하는 부분이 아니므로 꼭 필요한 부분은 아니다
    type Like {
        id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`;
