import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photo.utils';

export default {
    Mutation: {
        editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser }) => {
            // const photo = await client.photo.findUnique({where: {id}});
            // if(photo.userId !==  loggedInUser.id) {
            //     return {
            //         ok:false,
            //         error: "Photo not found"
            //     }
            // }
            const oldPhoto = await client.photo.findFirst({
                where: { id, userId: loggedInUser.id },
                include: { hashtags: { select: { hashtag: true } } },
            });
            if (!oldPhoto) {
                return {
                    ok: false,
                    error: 'Photo not found',
                };
            }
            console.log(oldPhoto);
            const photo = await client.photo.update({
                where: { id },
                data: {
                    caption,
                    hashtags: {
                        disconnect: oldPhoto.hashtags,
                        connectOrCreate: processHashtags(caption),
                    },
                },
            });
            return {
                ok: true,
            };
        }),
    },
};
