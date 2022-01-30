import { createWriteStream, existsSync, mkdirSync } from 'fs';
import bcrypt from 'bcrypt';
import GraphQLUpload from 'graphql-upload';
import client from '../../client';
import { protectResolver } from '../users.utils';

export default {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { firstName, lastName, username, email, password: newPassword, bio, avatar },
                { loggedInUser }
            ) => {
                let avatarUrl = null;
                if (avatar) {
                    const {
                        file: { filename, createReadStream },
                    } = avatar;
                    const savedPath = process.cwd() + '/uploads/' + loggedInUser.id;
                    const newFilename = `${Date.now()}${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(savedPath + '/' + newFilename);
                    if (!existsSync(savedPath)) mkdirSync(savedPath);
                    readStream.pipe(writeStream);
                    avatarUrl = `http://localhost:4000/static/${newFilename}`;
                }
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        ...(uglyPassword && { password: uglyPassword }),
                        ...(avatarUrl && { avatar: avatarUrl }),
                    },
                });
                if (updatedUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                    };
                }
            }
        ),
    },
};
