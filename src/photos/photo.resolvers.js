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
