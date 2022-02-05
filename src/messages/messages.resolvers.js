import client from '../client';

export default {
    Room: {
        users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
        messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
        unreadTotal: ({ id }, _, { loggedInUser }) => {
            return loggedInUser
                ? client.message.count({
                      where: {
                          read: false,
                          roomId: id,
                          user: { id: { not: loggedInUser.id } },
                      },
                  })
                : 0; // 로그인하지 않은 사용자도 호출할 수 있으므로 그때는 0을 보내준다.
        },
    },
    Message: {
        user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
    },
};
