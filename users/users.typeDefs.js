import { gql } from 'apollo-server';

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        # password 항목은 필요하지 않음
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    }
    type Query {
        seeProfile(username: String!): User
    }
`;
