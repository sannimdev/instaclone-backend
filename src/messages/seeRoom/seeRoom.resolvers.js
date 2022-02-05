import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
    Query: {
        seeRoom: protectedResolver((_, { id }, { loggedInUser }) =>
            client.room.findUnique({
                where: {
                    id,
                    users: { some: { id: loggedInUser.id } },
                },
                // include: {
                //     users: true,
                //     message: true,
                // },
            })
        ),
    },
};
