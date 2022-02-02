import client from '../client';

export default {
    Photo: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        hashtags: ({ id }) =>
            client.hashtag.findMany({
                where: {
                    photos: {
                        some: { id },
                    },
                },
            }),
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
        comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) return false; // 로그인하지 않은 경우도 항상 고려해야 한다.
            return userId === loggedInUser.id;
        },
    },
    Hashtag: {
        photos: async ({ id }, { page }, { loggedInUser }) => {
            console.log(args);
            await client.hashtag.findUnique({ where: { id } }).photos();
        },
        totalPhotos: ({ id }) =>
            client.photo.count({
                where: {
                    hashtags: {
                        some: { id },
                    },
                },
            }),
    },
};
