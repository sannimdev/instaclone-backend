import client from '../../client';

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({
                where: { photoId: id },
                // 선택된 데이터에서 또 선택한다. select와 include는 동시에 사용할 수 없음.
                select: { user: true }, // user만 선택했으니까 결괏값에 user 항목만 나온다
                /*
                    select: { user: { select: { username: true } } },
                    반면, include는 결괏값으로 해당하는 항목(아래에서는 photo, hashtags)까지 포함하는 것이다.
                    include: { photo: { include: { hashtags: true } } },
                */
            });
            return likes.map(({ user }) => user);
        },
    },
};
