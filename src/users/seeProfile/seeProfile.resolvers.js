import client from '../../client';

export default {
    Query: {
        seeProfile: (_, { username }) =>
            client.user.findUnique({
                where: {
                    username,
                },
                // following이나 follwers의 결과 개수가 수천만 건 등 양이 상당해지면 다음의 include 옵션은 바람직하지 않다
                include: {
                    following: true,
                    followers: true,
                },
            }),
    },
};
