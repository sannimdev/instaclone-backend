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

export const protectResolver = (user) => {
    if (!user) {
        throw Error('You need to login.');
    }
};
