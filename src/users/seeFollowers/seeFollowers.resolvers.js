import client from '../../client';

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            // 단지 존재의 유무를 확인하기 위해 모든 컬럼의 정보를 가져올 필요가 없으므로 select 항목을 이용한다.
            const ok = await client.user.findUnique({ where: { username }, select: { id: true } });
            if (!ok) {
                return {
                    ok: false,
                    error: 'User not found',
                };
            }
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({ take: 5, skip: (page - 1) * 5 });
            const totalFollowers = await client.user.count({ where: { following: { some: { username } } } });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
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
