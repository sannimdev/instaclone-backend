import { withFilter } from 'graphql-subscriptions';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {
                const room = await client.room.findUnique({ where: { id: args.id }, select: { id: true } });
                console.log(room, '존재하는가');
                if (!room) throw new Error('You shall not see this.');
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    ({ roomUpdates }, { id }) => {
                        return roomUpdates.roomId === id;
                    }
                )(root, args, context, info);
            },
        },
    },
};
