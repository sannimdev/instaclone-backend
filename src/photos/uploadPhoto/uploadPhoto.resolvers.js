import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photo.utils';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

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
            let fileUrl = null;
            if (file) {
                const {
                    file: { filename, createReadStream },
                } = file;
                const savedPath = process.cwd() + '/uploads/' + loggedInUser.id;
                const newFilename = `${Date.now()}${filename}`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(savedPath + '/' + newFilename);
                if (!existsSync(savedPath)) mkdirSync(savedPath);
                readStream.pipe(writeStream);
                fileUrl = `http://10.1.1.160:4001/static/${loggedInUser.id}/${newFilename}`;
            }
            // add the photo to the hashtags
            return client.photo.create({
                data: {
                    file: fileUrl,
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
