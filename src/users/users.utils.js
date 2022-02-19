import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });
        if (user) {
            return user;
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
    console.log('loll');
    if (!context.loggedInUser) {
        const query = info.operation.operation === 'query';
        if (query) {
            // return type이 Mutation과 다르기 때문
            return null;
        } else {
            return {
                ok: false,
                error: 'Please log in to perform this action.',
            };
        }
    }
    return ourResolver(root, args, context, info);
};

// function protectedResolver(ourResolver) {
//     return function (root, args, context, info) {
//         if (!context.loggedInUser) {
//             return {
//                 ok: false,
//                 error: 'Please log in to perform this action.',
//             };
//         }
//         return ourResolver(root, args, context, info);
//     };
// }
