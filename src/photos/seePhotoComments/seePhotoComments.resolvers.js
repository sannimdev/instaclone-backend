import client from '../../client';

export default {
    Query: {
        // 페이징 생략
        seePhotoComments: (_, { id }) =>
            client.comment.findMany({
                where: { photoId: id },
                orderBy: { createdAt: 'asc' },
            }),
    },
};
