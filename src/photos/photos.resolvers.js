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
        comments: ({ id }) => client.comment.findMany({ where: { photoId: id }, include: { user: true } }),
        commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) return false; // 로그인하지 않은 경우도 항상 고려해야 한다.
            return userId === loggedInUser.id;
        },
        isLiked: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            const ok = await client.like.findUnique({
                where: { photoId_userId: { photoId: id, userId: loggedInUser.id } },
                select: { id: true },
            });
            if (ok) return true;
            return false;
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
