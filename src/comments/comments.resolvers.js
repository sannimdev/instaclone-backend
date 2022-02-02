export default {
    Comment: {
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) return false; // 로그인하지 않은 경우도 항상 고려해야 한다.
            return userId === loggedInUser.id;
        },
    },
};
