import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
            let hashtagObjs = [];
            if (caption) {
                // parse caption
                // get or create Hashtags
                const hashtags = caption.match(/#[\w]+/g);
                hashtagObjs = hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }));
            }
            //save the photo WITH the parsed hashtags
            // add the photo to the hashtags
            return client.photo.create({
                data: {
                    file,
                    caption,
                    user: { connect: { id: loggedInUser.id } },
                    ...(hashtagObjs.length && {
                        hashtags: {
                            connectOrCreate: hashtagObjs,
                        },
                    }),
                },
            });
        }),
    },
};
