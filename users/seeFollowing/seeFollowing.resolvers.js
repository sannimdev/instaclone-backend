import client from '../../client';

export default {
    Query: {
        seeFollowing: async (_, { username, lastId }) => {
            // 단지 존재의 유무를 확인하기 위해 모든 컬럼의 정보를 가져올 필요가 없으므로 select 항목을 이용한다.
            const ok = await client.user.findUnique({ where: { username }, select: { id: true } });
            if (!ok) {
                return {
                    ok: false,
                    error: 'User not found',
                };
            }
            const following = await client.user.findUnique({ where: { username } }).following({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
            return {
                ok: true,
                following,
            };
        },
    },
};
