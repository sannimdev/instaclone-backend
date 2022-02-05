import client from '../client';

export default {
    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
        messages: ({ id }) => client.message.findUnique({ where: { roomId: id } }),
        unreadTotal: () => 0,
    },
};
