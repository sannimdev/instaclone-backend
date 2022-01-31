export default {
    User: {
        totalFollowing: (root) => {
            //root로 graphql에서 넘긴 인잣값(username)을 기준으로 조회한 쿼리에 대한 결괏값을 resolver에서 받아 처리할 수 있음
            console.log('totalFollowing root', root);
            return 0;
        },
        totalFollowers: (root) => {
            console.log('totalFollowers root', root);
            return 0;
        },
    },
};
