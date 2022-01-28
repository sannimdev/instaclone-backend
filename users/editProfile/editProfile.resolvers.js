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
                const {
                    file: { filename, createReadStream },
                } = avatar;
                const stream = createReadStream();
                console.log(stream);
                console.log(filename, createReadStream);
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
