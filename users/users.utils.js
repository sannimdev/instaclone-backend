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

export const protectResolver = (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        return {
            ok: false,
            error: 'Please log in to perform this action.',
        };
    }
    return ourResolver(root, args, context, info);
};

// export const protectResolver = function (ourResolver) {
//     return function (root, args, context, info) {
//         return {
//             ok: false,
//             error: 'Please log in to perform this action.',
//         };
//     };
// };
