import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photo.utils';

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
            let hashtagObjs = [];
            if (caption) {
                // parse caption
                // get or create Hashtags
                hashtagObjs = processHashtags(caption);
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
