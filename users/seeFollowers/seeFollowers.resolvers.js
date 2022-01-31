import client from '../../client';

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({ take: 5, skip: (page - 1) * 5 });
            return {
                ok: true,
                followers,
            };
            // 아래의 조건으로도 동일한 결괏값을 찾아낼 수 있음
            // const bFollowers = await client.user.findMany({
            //     where: {
            //         following: {
            //             some: {
            //                 username,
            //             },
            //         },
            //     },
            // });
        },
    },
};
